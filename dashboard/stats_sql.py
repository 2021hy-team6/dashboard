stats_sql = {
    # Daily ratio
    'day_ratio': """
SELECT S.sup_name AS sup_name
     , COUNT(T1.sup_id) AS cnt
	 , ROUND(COUNT(T1.sup_id)::numeric / MAX(T1.total_cnt), 3) AS ratio
  FROM (SELECT C.sup_id
		     , count(*) OVER() AS total_cnt
		  FROM image I
			 , detection D
			 , category C
		 WHERE I.img_id = D.img_id
		   AND D.obj_name = C.obj_name
		   AND timestamp %s <= I.created_at
		   AND I.created_at <= (timestamp %s + interval '1' day)) T1
 RIGHT OUTER JOIN super_category S
	ON T1.sup_id = S.sup_id
 GROUP BY S.sup_name
 ORDER BY cnt DESC
 FETCH FIRST 5 ROWS only;""",
    
    # Daily counts
    'day_cnt': """
WITH W1 AS (
	SELECT T3.hour AS label
		 , T3.sup_name AS sup_name
		 , count(T1.hour) AS cnt
	  FROM (SELECT extract(hour from created_at) AS hour
				 , C.sup_id
			  FROM image I
				 , detection D
				 , category C
			 WHERE I.img_id = D.img_id
			   AND D.obj_name = C.obj_name
			   AND timestamp %s <= I.created_at
		   AND I.created_at <= (timestamp %s + interval '1' day)) T1
	 RIGHT OUTER JOIN
		   (SELECT T2.hour, S.sup_id, S.sup_name
		  FROM generate_series(0, 23) AS T2(hour)
			 , super_category S
		   ) T3 ON (T1.hour = T3.hour AND T1.sup_id = T3.sup_id)
	 GROUP BY T3.hour, T3.sup_name
)
SELECT W1.label, W1.sup_name, W1.cnt
  FROM W1
 WHERE W1.sup_name IN
       (SELECT sup_name
	      FROM W1
		 GROUP BY sup_name
		 ORDER BY count(*)
		 FETCH FIRST 3 ROWS ONLY
	   )
 ORDER BY W1.label, W1.sup_name;""",
    
    # Usage counts
    'week_usage': """
SELECT T3.date AS label
     , COALESCE(T2.cnt, 0) AS value
  FROM (SELECT to_char(I.created_at, 'YYYY.MM.DD') AS date
			 , count(*) AS cnt
		  FROM image I
		 WHERE (timestamp %s - interval '7' day) <= I.created_at
		   AND I.created_at < (timestamp %s + interval '1' day)
		   AND EXISTS
			   (SELECT 1
				  FROM detection D
				 WHERE D.img_id = I.img_id
			   )
		 GROUP BY date
	   ) T2
 RIGHT OUTER JOIN
       (SELECT to_char(timestamp %s
					   - (T1.intv || ' day')::interval, 'YYYY.MM.DD') AS date
  		  FROM generate_series(6, 0, -1) AS T1(intv)
	   ) T3 ON (T2.date = T3.date)
 ORDER BY T3.date;""",
    
    # Recyclable Rate
    'day_rec': """
SELECT CONCAT((hour*3)::text, ' ~ ', ((hour+1)*3)::text) AS label
     , ROUND(true_cnt::numeric / (true_cnt+false_cnt) * 100, 2) AS value
  FROM (SELECT TRUNC(extract(hour from I.created_at) / 3) AS hour
			 , sum(case when     S.is_recyclable then 1 else 0 end) AS true_cnt
			 , sum(case when not S.is_recyclable then 1 else 0 end) AS false_cnt
		  FROM image I
			 , detection D
			 , category C
			 , super_category S
		 WHERE I.img_id = D.img_id
		   AND D.obj_name = C.obj_name
		   AND C.sup_id = S.sup_id
		   AND timestamp %s <= I.created_at
		   AND I.created_at <= (timestamp %s + interval '1' day)
		 GROUP BY hour
	   ) T1
 ORDER BY hour;""",
    
    # Detection Time
    'day_time': """
SELECT CONCAT((hour*3)::text, ' ~ ', ((hour+1)*3)::text) AS label
     , ROUND(avg_msec/1000, 3) as value
  FROM (SELECT TRUNC(extract(hour from I.created_at) / 3) AS hour
			 , AVG(I.msec) AS avg_msec
		  FROM image I
		 WHERE timestamp %s <= I.created_at
		   AND I.created_at <= (timestamp %s + interval '1' day)
		 GROUP BY hour
	   ) T1
 ORDER BY hour;""",
    
    # Monthly Comparison
    'mon_comp': """
WITH W1 AS (
	SELECT C.obj_name
	     , S.sup_id
	  FROM category C
	     , super_category S
     WHERE C.sup_id = S.sup_id
)
SELECT S.sup_name
     , COALESCE(T1.cnt, 0) AS prev_cnt
	 , COALESCE(T2.cnt, 0) AS cnt
	 , COALESCE(T2.cnt, 0) - COALESCE(T1.cnt, 0) AS diff
  FROM (SELECT W1.sup_id
		     , count(*) AS cnt
	      FROM image I
	         , detection D
	         , W1
	     WHERE I.img_id = D.img_id
	       AND D.obj_name = W1.obj_name
		   AND ("timestamp" (%s||'-'||%s||'-01 00:00:00') - interval '1' month) <= I.created_at
   		   AND I.created_at <= "timestamp" (%s||'-'||%s||'-01 00:00:00')
	     GROUP BY W1.sup_id
	   ) T1
 RIGHT OUTER JOIN
      (SELECT W1.sup_id
		     , count(*) AS cnt
	      FROM image I
	         , detection D
	         , W1
	     WHERE I.img_id = D.img_id
	       AND D.obj_name = W1.obj_name
		   AND "timestamp" (%s||'-'||%s||'-01 00:00:00') <= I.created_at
   		   AND I.created_at <= ("timestamp" (%s||'-'||%s||'-01 00:00:00') + interval '1' month)
	     GROUP BY W1.sup_id
	   ) T2 ON (T1.sup_id = T2.sup_id)
	 , super_category S
 WHERE T2.sup_id = S.sup_id
 ORDER BY ABS(COALESCE(T2.cnt, 0)-COALESCE(T1.cnt, 0)) DESC
 FETCH FIRST 5 ROWS only;""",
    
    # Annual Count
    'ann_cnt': """
SELECT D.obj_name
     , S.sup_name
     , count(*) as cnt
	 , ROUND(count(*)::numeric / count(*) OVER() * 100, 2) as ratio
  FROM image I
     , detection D
	 , category C
	 , super_category S
 WHERE I.img_id = D.img_id
   AND D.obj_name = C.obj_name
   AND C.sup_id = S.sup_id
   AND "timestamp" (%s || '-01-01 00:00:00') <= I.created_at
   AND I.created_at <= ("timestamp" (%s || '-01-01 00:00:00') + interval '1' year)
   AND S.is_recyclable = true
 GROUP BY D.obj_name, S.sup_name
 ORDER BY cnt DESC, D.obj_name
 FETCH FIRST 5 ROWS only;"""
}
