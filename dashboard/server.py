from flask import Flask, jsonify
from db import Psql

app = Flask(__name__)
psql = Psql()

# Execute Query
def query(sql, params = ()):
    with get_conn() as conn, get_cursor(conn) as cur:
        cur.execute(sql, params)
        return cur.fetchall()
    
@app.route('/')
def index():
    return f"""<h1>Hello World</h1>
            <p>{psql.query('select now()')}</p>
            <p>/superCategories/&lt;int:sup_id&gt;</p>"""


@app.route('/superCategories/<int:sup_id>')
def superCategories(sup_id):
    return jsonify(psql.query('select * from super_category where sup_id = %s', (sup_id,)))
