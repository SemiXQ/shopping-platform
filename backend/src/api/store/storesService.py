from flask import Blueprint, current_app, jsonify
from src.model.store import Store
from src.cache import cache
import json
from typing import Final, List, Optional
import os
from src.entity import database

stores_bp = Blueprint('stores_bp', __name__)

@cache.cached(timeout=50, key_prefix='all_stores')
def cachedGetAll() -> (dict[str, Store], List[dict]):
    stores: dict[str, Store] = {}
    stores_dict: List[dict] = []
    try:
        data_mode = current_app.config["DATA_FROM"]
        store_data = None
        if data_mode == "db":
            store_data = database.getAll(database.Tables.STORE)
            print("Store data fetched successfully")
        else:
            app_root = current_app.config["ROOT_PATH"]
            temp_data_path = os.path.join(app_root, 'test_data/stores.json')
            with open(temp_data_path, "r") as f:
                print("read file - stores")
                store_data = json.load(f)
        
        for store_json in store_data:
            store = Store(store_json)
            stores[store.id] = store
            stores_dict.append(store.toDict())
    except Exception as err:
        print("Fetching Mode: ", data_mode, " Error in fetching all stores: ", err)
    return stores, stores_dict

# get all stores
@stores_bp.route('/', methods=['GET'])
def getAll():
    _, stores_dict = cachedGetAll()
    if stores_dict:
        return jsonify({"stores": stores_dict}), 200
    else:
        return jsonify({"error": "Data not found"}), 404