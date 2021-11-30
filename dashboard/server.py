from flask import Flask, jsonify
from db import Psql
from mock_stats import MockStats
from stats import Stats

app = Flask(__name__)
psql = Psql()
mockStats = MockStats(psql)
stats = Stats(psql)

@app.route('/')
def index():
    return jsonify({
                    'db_info': psql.get_metadata(),
                    'statistics_link' : [
                        
                    ],
                    'create_dummy_link' : [
                        '/dummy/categories',
                        '/dummy/detections'
                    ]})

@app.route('/dummy/categories')
def dummy_categories():
    return jsonify(mockStats.create_categories())

@app.route('/dummy/detections')
def dummy_detections():
    return jsonify(mockStats.create_detections())

@app.route('/stats/realtime')
@app.route('/stats/<date_time>/realtime')
def stats_realtime(date_time=''):
    return f"<p>{date_time}, {str(date_time)}</p>"

@app.route('/stats/categories')
@app.route('/stats/<date_time>/categories')
def stats_categories(date_time=''):
    return jsonify(stats.categories(date_time))

@app.route('/stats/dailygraph')
@app.route('/stats/<date_time>/dailygraph')
def stats_dailygraph(date_time=''):
    return jsonify(stats.dailygraph(date_time))
