from flask import Blueprint, current_app, jsonify
from src.model.good import Good
from src.cache import cache
import json
from typing import Final, List, Optional
import os

goods_bp = Blueprint('goods_bp', __name__)

# TODO: change to request data from database
@cache.cached(timeout=60, key_prefix='all_goods')
def cachedGetAll() -> (dict[str, Good], List[dict]):
    goods: dict[str, Good] = {}
    goods_dict: List[dict] = []
    try:
        app_root = current_app.config["ROOT_PATH"]
        temp_data_path = os.path.join(app_root, 'test_data/goods.json')
        with open(temp_data_path, "r") as f:
            print("read file")
            good_data = json.load(f)['goods']
            for good_json in good_data:
                good = Good(good_json)
                goods[good.id] = good
                goods_dict.append(good.toDict())
    except FileNotFoundError:
        print("Goods Json not found")
    return goods, goods_dict

# get all goods
@goods_bp.route('/', methods=['GET'])
def getAll():
    _, goods_dict = cachedGetAll()
    if goods_dict:
        return jsonify({"goods": goods_dict}), 200
    else:
        return jsonify({"error": "Data not found"}), 404

# get good by id
@goods_bp.route('/<string:id>', methods=['GET'])
def getById(id:str):
    goods, _ = cachedGetAll()
    target = goods.get(id, None)
    if isinstance(target, Good):
        target = target.toDict()
    if target:
        return jsonify({"good": target}), 200
    else:
        return jsonify({"error": "Good not found"}), 404