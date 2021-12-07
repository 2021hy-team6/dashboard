from flask import Flask, jsonify
from flask_cors import CORS
from db import Psql
from mock_stats import MockStats
from stats import Stats

app = Flask(__name__)
CORS(app)

psql = Psql()
mockStats = MockStats(psql)
stats = Stats(psql)

@app.route('/')
def index():
    return jsonify({
                    'db_info': psql.get_metadata(),
                    'statistics_link' : [
                        '/stats/day/ratio',
                        '/stats/day/cnt',
                        '/stats/day/rec',
                        '/stats/day/time',
                        '/stats/week/usage',
                        '/stats/mon/comp',
                        '/stats/ann/cnt'
                    ],
                    'create_dummy_link' : [
                        '/dummy/categories',
                        '/dummy/detections'
                    ]})


# Create dummies
@app.route('/dummy/categories')
def dummy_categories():
    return jsonify(mockStats.create_categories())

@app.route('/dummy/detections')
def dummy_detections():
    return jsonify(mockStats.create_detections())


# Statistics
@app.route('/stats/day/ratio')
@app.route('/stats/<date_time>/day/ratio')
def stats_day_ratio(date_time=''):
    return jsonify(stats.day_ratio(date_time))

@app.route('/stats/day/cnt')
@app.route('/stats/<date_time>/day/cnt')
def stats_day_cnt(date_time=''):
    return jsonify(stats.day_cnt(date_time))

@app.route('/stats/week/usage')
@app.route('/stats/<date_time>/week/usage')
def stats_week_usage(date_time=''):
    return jsonify(stats.week_usage(date_time))

@app.route('/stats/day/rec')
@app.route('/stats/<date_time>/day/rec')
def stats_day_rec(date_time=''):
    return jsonify(stats.day_rec(date_time))

@app.route('/stats/day/time')
@app.route('/stats/<date_time>/day/time')
def stats_day_time(date_time=''):
    return jsonify(stats.day_time(date_time))

@app.route('/stats/mon/comp')
@app.route('/stats/<date_time>/mon/comp')
def stats_mon_comp(date_time=''):
    return jsonify(stats.mon_comp(date_time))
    
@app.route('/stats/ann/cnt')
@app.route('/stats/<date_time>/ann/cnt')
def stats_ann_cnt(date_time=''):
    return jsonify(stats.ann_cnt(date_time))
