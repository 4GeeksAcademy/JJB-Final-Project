"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import re
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():

    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not email or not re.match(email_regex, email):
            return jsonify({"error": "Formato de correo inválido"}), 400
        
        if not password:
            return jsonify({"error": "Contraseña requerida"}), 400
        
        user = User.query.filter_by(email = email, password = password).first()
        if user is None:
            return jsonify({"msg": "Email o password incorrectos"}), 404

        access_token = create_access_token(identity= email)
        return jsonify(access_token=access_token),200
    
    except Exception as e:

        return jsonify({"error": "Error interno del servidor", "details": str(e)}), 500
    
    
@api.route("/register", methods=["POST"])
def register():

    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        nickname = request.json.get("nickname", None)

        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

        if not email or not re.match(email_regex, email):
            return jsonify({"error": "Formato de correo inválido"}), 400
        
        if not password:
            return jsonify({"error": "Contraseña requerida"}), 400

        if not nickname:
            return jsonify({"error": "Apodo requerido"}), 400

    
    except Exception as e:

        return jsonify({"error": "Error interno del servidor", "details": str(e)}), 500



