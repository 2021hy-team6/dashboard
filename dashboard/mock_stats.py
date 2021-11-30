import random
import string
import datetime

class MockStats:
    def __init__(self, psql):
        self.psql = psql
        
    def get_random_text(self, length):
        name = [random.choice(string.ascii_letters)
                for _ in range(random.choice(range(length-2, length+2)))]
        name[random.choice(range(3, length-3))] = ' '
        name = ''.join(name).capitalize()
        return name

    def get_random_datetime(self, yyyy, mm, dd):
        dttm = datetime.datetime(yyyy, mm, dd) + random.random() * datetime.timedelta(days=1)
        return dttm.strftime("%Y-%m-%d %H:%M:%S")
    
    def create_categories(self):
        if self.psql.query('select count(*) as cnt from category')[0]['cnt'] > 0:
            return {'super_category': self.psql.query('select * from super_category'),
                    'category': self.psql.query('select * from category')} 

        # Super Categories
        sql_string = """INSERT INTO super_category
                               (sup_name, is_recyclable)
                        VALUES (%s, %s)"""
        
        # Insertion
        for _ in range(10):
            self.psql.execute(sql_string, (self.get_random_text(10), True))
        
        # Set litter
        self.psql.execute(sql_string, ('Litter', False))
        self.psql.execute(sql_string, ('Uncategorized', False))
        
        # Categories
        sql_string = """INSERT INTO category
                               (obj_name, sup_id)
                        VALUES (%s, %s)"""
        
        # Get the range of super categories
        sup_ids = [row['sup_id'] for row in self.psql.query('select sup_id from super_category')]
        
        # Insertion
        for sup_id in sup_ids:
            for _ in range(random.choice(range(8, 15))):
                self.psql.execute(sql_string, (self.get_random_text(15), sup_id))
        
        return {'super_category': self.psql.query('select * from super_category'),
                'category': self.psql.query('select * from category')}

    
    def create_detections(self):
        if self.psql.query('select count(*) as cnt from detection')[0]['cnt'] > 0:
            return {'image': self.psql.query('select * from image'),
                    'detection': self.psql.query('select * from detection')}

        # Image
        sql_string = """INSERT INTO image
                               (msec, created_at)
                        VALUES (%s, timestamp %s)"""
        
        for _ in range(144):
            self.psql.execute(sql_string, (random.choice(range(100, 300)), self.get_random_datetime(2021, 12, 1)))
        
        # Detection
        sql_string = """INSERT INTO detection
                               (img_id, obj_name, score)
                        VALUES (%s, %s, %s)"""
        
        img_ids = [row['img_id'] for row in self.psql.query('select img_id from image')]
        obj_names = [row['obj_name'] for row in self.psql.query('select obj_name from category')]
        
        # Insertion
        for img_id in img_ids:
            for _ in range(random.choice(range(1, 6))):
                self.psql.execute(sql_string, (img_id, random.choice(obj_names), round(random.choice(range(550, 999))*0.001, 3)))
        
        return {'image': self.psql.query('select * from image'),
                'detection': self.psql.query('select * from detection')}
