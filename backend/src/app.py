from flask import Flask, jsonify, request
from flask_cors import CORS

# creating the flask app
app = Flask(__name__)
CORS(app)