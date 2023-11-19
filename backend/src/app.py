from flask import Flask, jsonify, request
from flask_cors import CORS
from src.cache import cache

from src.api.good import goodsService
from src.api.store import storesService
from src.api.user import userService
from src.api.cart import cartService
from typing import Final
from src.env.constants import SECRET_KEY, DB_URI, DATA_FROM

# creating the flask app
app = Flask(__name__)

app_root: Final[str] = app.root_path

config = {
    "ENV": "development",
    "DEBUG": True,
    "CACHE_TYPE": "SimpleCache",
    "CACHE_DEFAULT_TIMEOUT": 100,
    "SECRET_KEY": "U2VjcmV0IGtleSBTSE9QSA==",
    "MONGO_URI": DB_URI,
    "DATA_FROM": DATA_FROM,
    "ROOT_PATH": app_root
}

CORS(app)

app.config.from_mapping(config)
cache.init_app(app)

app.register_blueprint(goodsService.goods_bp, url_prefix='/goods')
app.register_blueprint(storesService.stores_bp, url_prefix='/stores')
app.register_blueprint(userService.users_bp, url_prefix='/user')
app.register_blueprint(cartService.carts_bp, url_prefix='/cart')