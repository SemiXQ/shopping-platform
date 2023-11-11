from flask import Blueprint, current_app, jsonify
from src.model.store import Store
from src.cache import cache
import json
from typing import Final, List, Optional
import os

stores_bp = Blueprint('stores_bp', __name__)

# TODO: change to request data from database
@cache.cached(timeout=50, key_prefix='all_stores')
def cachedGetAll() -> (dict[str, Store], List[dict]):
    stores: dict[str, Store] = {}
    stores_dict: List[dict] = []
    try:
        app_root = current_app.config["ROOT_PATH"]
        temp_data_path = os.path.join(app_root, 'test_data/stores.json')
        with open(temp_data_path, "r") as f:
            print("read file")
            store_data = json.load(f)['stores']
            for store_json in store_data:
                store = Store(store_json)
                stores[store.id] = store
                stores_dict.append(store.toDict())
    except FileNotFoundError:
        print("Stores Json not found")
    return stores, stores_dict

# get all stores
@stores_bp.route('/', methods=['GET'])
def getAll():
    _, stores_dict = cachedGetAll()
    if stores_dict:
        return jsonify({"stores": stores_dict}), 200
    else:
        return jsonify({"error": "Data not found"}), 404