from flask import Blueprint, current_app, jsonify, request, abort, Response
from src.model.user import User
from src.cache import cache
import json
from typing import Final, List, Optional
import os
from werkzeug.security import check_password_hash
import bcrypt
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from src.env.constants import DECRYPT_KEY
from base64 import b64decode

# TODO: add api to check session expiration


users_bp = Blueprint('users_bp', __name__)

# TODO: change to request data from database
@cache.cached(timeout=60, key_prefix='all_users')
def cachedGetAll() -> (dict[str, User], dict[str, dict]):
    users: dict[str, User] = {}
    users_dict: dict[str, dict] = {}
    try:
        app_root = current_app.config["ROOT_PATH"]
        temp_data_path = os.path.join(app_root, 'test_data/users.json')
        with open(temp_data_path, "r") as f:
            print("read file - users")
            user_data = json.load(f)['users']
            for user_json in user_data:
                user = User(user_json)
                # both user.id and user.email are unique for a specific user
                users[user.email] = user
                users_dict[user.email] = user.toDict()
    except FileNotFoundError:
        print("User Json not found")
    return users, users_dict

# TODO: change to request data from database
def fetchAuthDataWithEmail(email: str) -> (bool, str):
    hashedpwd = ''
    succeed = False
    try:
        app_root = current_app.config["ROOT_PATH"]
        temp_data_path = os.path.join(app_root, 'test_data/users.json')
        with open(temp_data_path, "r") as f:
            print("read file - users - fetch Auth")
            user_data = json.load(f)['users']
            user_auth = {user['email']: user['hashed_pwd'] for user in user_data}
            hashedpwd = user_auth.get(email, '')
            if not hashedpwd:
                print('Fail to Auth: Issue in DB')
            else:
                succeed = True
    except FileNotFoundError:
        print("User Json not found")
    return (succeed, hashedpwd)

def authVerify(email: str, pwd: str) -> bool:
    users, _ = cachedGetAll()
    userValidity = email in users.keys()
    if not userValidity:
        # TODO: In this case, should return a json in login API to notify front-end and routing to sign up page
        print("User Not find")
        return False
    else:
        # TODO: change to request users' hashed password from DB
        pwdValidity = False
        status_good, hashedPwd = fetchAuthDataWithEmail(email)
        if status_good:
            pwdValidity = check_password_hash(hashedPwd, pwd)
        else:
            return False
        if not pwdValidity:
            # TODO: In this case, should return a json in login API to notify user to try another password
            print("Password not correct")
            return False
        else:
            return True

def decrypt_encryptedData(encrypted_data: str) -> str:
    encrypted_data = b64decode(encrypted_data)
    cipher = AES.new(DECRYPT_KEY, AES.MODE_CBC, encrypted_data)
    decrypted_data = unpad(cipher.decrypt(encrypted_data), AES.block_size)
    print(decrypted_data)
    return decrypted_data.decode('utf-8')


# login
@users_bp.route('/login', methods=['POST'])
def login():
    _, user_dict = cachedGetAll()
    if not user_dict:
        return abort(Response("DB issue: file not found", status=404))
    data = request.get_json()
    email = data.get("email")
    encrytedPwd = data.get("pwd")
    pwd = decrypt_encryptedData(encrytedPwd)
    if not email or not pwd:
        return abort(Response("Could not verify - data missing", status=401))
    if not authVerify(email, pwd):
        return abort(Response("Invalid email or password", status=403))
    # verified user:
    return jsonify(user_dict[email]), 200
