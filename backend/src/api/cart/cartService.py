from flask import Blueprint, current_app, jsonify, request, abort, Response
from src.model.cart import Cart
from src.cache import cache
import json
from typing import Final, List, Optional
import os
from werkzeug.security import check_password_hash


carts_bp = Blueprint('carts_bp', __name__)

# TODO: change to request data from database
@cache.cached(timeout=60, key_prefix='all_carts')
def cachedGetAll() -> (dict[str, Cart], dict[str, dict]):
    carts: dict[str, Cart] = {}
    carts_dict: dict[str, dict] = {}
    try:
        app_root = current_app.config["ROOT_PATH"]
        temp_data_path = os.path.join(app_root, 'test_data/carts.json')
        with open(temp_data_path, "r") as f:
            print("read file - carts")
            cart_data = json.load(f)['carts']
            for cart_json in cart_data:
                cart = Cart(cart_json)
                # both cart.id and cart.email are unique for a specific cart
                carts[cart.user_id] = cart
                carts_dict[cart.user_id] = cart.toDict()
    except FileNotFoundError:
        print("cart Json not found")
    return carts, carts_dict

@carts_bp.route('/<string:id>', methods=['GET', 'POST'])
def getOrUpdateCartById(id: str):
    carts, carts_dict = cachedGetAll()
    if request.method == 'GET':
        if id in carts_dict.keys():
            return jsonify(carts_dict[id]), 200
        else:
            # TODO: it should create a new cart with user ID in database instead
            return jsonify({}), 200
    if request.method == "POST":
        # TODO: implement
        return jsonify("update cart api works"), 200