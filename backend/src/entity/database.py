from flask import current_app
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from werkzeug.local import LocalProxy
from src.entity.apis import cart, store, good, user
from typing import Tuple

from enum import Enum

class Tables(Enum):
    USER=1
    CART=2
    STORE=3
    GOOD=4


def connectDB():
    # db = PyMongo(current_app).db
    client = MongoClient(current_app.config["MONGO_URI"])
    try:
        client.admin.command('ping')
        print("Successfully connected to MongoDB!")
    except Exception as err:
        print("Failed to connect to cluster", err)
    db = client["shopping-angular"]
    if db is not None:
        print("Connected to DB successfully")
    else:
        print("Failed to connect DB")
    return db

db = LocalProxy(connectDB)

def getAll(table_name: Tables):
    if table_name == Tables.CART:
        return cart.get_all(db)
    elif table_name == Tables.STORE:
        return store.get_all(db)
    elif table_name == Tables.GOOD:
        return good.get_all(db)
    elif table_name == Tables.USER:
        return user.get_all(db)

def getOneByAttribute(table_name: Tables, attribute: Tuple[str, any]):
    if table_name == Tables.USER:
        if attribute[0] == "email":
            return user.get_user_by_email(db, attribute[1])
