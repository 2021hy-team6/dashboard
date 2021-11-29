import copy
from contextlib import contextmanager

import psycopg2
import psycopg2.pool
import psycopg2.extras

DEFAULT_CONFIG = {
    'host': '127.0.0.1',
    'port': '6002',
    'dbname': 'db_recm8',
    'user': 'usr_recm8',
    'password': 'mysecretpassword',
    'maxpool': 5
}

class Psql:
    def __init__(self, config={}):
        if config.keys() != DEFAULT_CONFIG.keys():
            print('config parameter is not valid. use the default config')
            self.config = copy.deepcopy(DEFAULT_CONFIG)
        else:
            self.config = copy.deepcopy(config)
        
        print('PostgreSQL Connection Info : ', self.config)
        self.psql_pool = None
        self._set_connection()
        

    def _set_connection(self):
        if self.psql_pool:
            return True
            
        # Create Connection Pools
        self.psql_pool = psycopg2.pool.SimpleConnectionPool(1, self.config['maxpool'],
            host=self.config['host'],
            port=self.config['port'],
            dbname=self.config['dbname'],
            user=self.config['user'],
            password=self.config['password'])
        
        if self.psql_pool:
            print('Successfully Connected')
        else:
            print('Failed to Connect')
    
    @contextmanager
    def _get_conn(self):
        assert self.psql_pool, "PostgreSQL is not connected"
        
        conn = self.psql_pool.getconn()
        try:
            yield conn
        finally:
            self.psql_pool.putconn(conn)


    @contextmanager
    def _get_cursor(self, conn):
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        try:
            yield cur
        finally:
            cur.close()    
    
    # Execute Query
    def query(self, sql, params = ()):
        with self._get_conn() as conn, self._get_cursor(conn) as cur:
            cur.execute(sql, params)
            return cur.fetchall()
