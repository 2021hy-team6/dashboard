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

CATEGORY_CONFIG_PATH = './classifications.json'

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
        '/dummy/detections/yyyyMMdd/days/images'
    ],
    'truncate_table' : [
        '/cascade/categories',
        '/cascade/detections'
]})


# Truncate tables
@app.route('/cascade/categories')
def cascade_categories():
    psql.execute('TRUNCATE TABLE super_category CASCADE');
    return jsonify('success')

@app.route('/cascade/detections')
def cascade_detections():
    psql.execute('TRUNCATE TABLE image CASCADE');
    return jsonify('success')

import json

@app.route('/import/categories')
def import_categories():
    with open(CATEGORY_CONFIG_PATH, 'r') as f:
        json_data = json.load(f)
    
    super_category = json_data['supercategories']
    for k in super_category.keys():
        psql.execute('INSERT INTO super_category (sup_id, sup_name, is_recyclable) VALUES (%s, %s, %s)',
                (super_category[k]['index'], k, super_category[k]['recyclable']))
    
    category = json_data['classifications']
    for k in category.keys():
        psql.execute('INSERT INTO category (obj_name, sup_id, special_instruct) VALUES (%s, %s, %s)',
                (k, category[k][0], '' if len(category[k]) < 2 else category[k][1]))

    return jsonify('success')

# Create dummies
@app.route('/dummy/categories')
def dummy_categories():
    return jsonify(mockStats.create_categories())

@app.route('/dummy/detections/')
@app.route('/dummy/detections/<yyyyMMdd>/<int:days>/<int:images>')
def dummy_detections(yyyyMMdd=None, days=None, images=None):
    return jsonify(mockStats.create_detections(yyyyMMdd, days, images))


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
