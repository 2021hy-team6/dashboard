import re
import datetime
from stats_sql import stats_sql as sql

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
    
    def _label_and_value(self, rows, label_col='label', value_col='value'):
        result = {'label': [], 'value': []}
        
        for row in rows:
            result['label'].append(row[label_col])
            result['value'].append(row[value_col])
        
        return result
        
    def day_ratio(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # Execute Query
        dt_string = dttm.strftime('%Y-%m-%d 00:00:00')
        rows = self.psql.query(sql['day_ratio'], (dt_string, dt_string))
        
        return rows
    
    def day_cnt(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # Execute Query
        dt_string = dttm.strftime('%Y-%m-%d 00:00:00')
        rows = self.psql.query(sql['day_cnt'], (dt_string, dt_string))
        
        # Parse results
        result = {'label': list(range(0, 24))}
        
        sup_names = set([row['sup_name'] for row in rows])
        for sup_name in sup_names:
            result[sup_name] = [row['cnt'] for row in rows
                                if row['sup_name'] == sup_name]
            
        return result
    
    def week_usage(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # Execute Query
        dt_string = dttm.strftime('%Y-%m-%d 00:00:00')
        rows = self.psql.query(sql['week_usage'], (dt_string, dt_string, dt_string))
        
        return self._label_and_value(rows)

    def day_rec(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # Execute Query
        dt_string = dttm.strftime('%Y-%m-%d 00:00:00')
        rows = self.psql.query(sql['day_rec'], (dt_string, dt_string))
        
        return self._label_and_value(rows)
    
    def day_time(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # Execute Query
        dt_string = dttm.strftime('%Y-%m-%d 00:00:00')
        rows = self.psql.query(sql['day_time'], (dt_string, dt_string))
        
        return self._label_and_value(rows)

    def mon_comp(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # Execute Query
        params = [x for y in [(dttm.year, dttm.month) for z in range(4)] for x in y]
        rows = self.psql.query(sql['mon_comp'], tuple(params))
        
        return rows

    def ann_cnt(self, date_time=None):
        dttm = self._dttm_or_now(date_time)
        
        # Execute Query
        rows = self.psql.query(sql['ann_cnt'], (dttm.year, dttm.year))
        
        return rows
