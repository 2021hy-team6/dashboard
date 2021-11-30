import re
import datetime

class Stats:
    def __init__(self, psql):
        self.psql = psql
    
    def _dttm_or_now(self, date_time=None):
        try:
            assert date_time
                
            if re.fullmatch('^\d{4}-\d{1,2}-\d{1,2}$', date_time):
                dttm = datetime.datetime.strptime(f"{date_time}", "%Y-%m-%d")
            else:
                dttm = datetime.datetime.strptime(date_time, "%Y-%m-%d %H:%M:%S")
        except:
            dttm = datetime.datetime.today()
        
        return dttm
    
    def realtime(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # TODO 
        
        return dict()
    
    def categories(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        sql_string = f"""
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
 ORDER BY cnt DESC;
        """
        
        # Execute Query
        dt_string = dttm.strftime('%Y-%m-%d 00:00:00')
        rows = self.psql.query(sql_string, (dt_string, dt_string))
        
        return rows
    
    def dailygraph(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        sql_string = f"""
SELECT T3.hour
     , COALESCE(T3.sup_name, 'Total') AS sup_name
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
 GROUP BY T3.hour, ROLLUP(T3.sup_name)
 ORDER BY T3.hour, T3.sup_name;
        """
        
        # Execute Query
        dt_string = dttm.strftime('%Y-%m-%d 00:00:00')
        rows = self.psql.query(sql_string, (dt_string, dt_string))
        
        # Parse results
        result = {'label': [i for i in range(0, 24)]}
        
        sup_names = set([row['sup_name'] for row in rows])
        for sup_name in sup_names:
            result[sup_name] = [row['cnt'] for row in rows
                                if row['sup_name'] == sup_name]
            
        return result
