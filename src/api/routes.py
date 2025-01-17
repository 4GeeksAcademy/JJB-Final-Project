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
            if not email:
                return jsonify({"error": "Correo requerido"}), 400
            else:
                return jsonify({"error": "Formato de correo inválido"}), 400
        
        if not password or len(password) < 6:
            if not password:
                return jsonify({"error": "Contraseña requerida"}), 400
            else:
                return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

        if not nickname:
            return jsonify({"error": "Apodo requerido"}), 400

        user = User.query.filter_by(email = email).first()
        if user is None:
            user_nickname = User.query.filter_by(nickname = nickname).first()
            if user_nickname is None:
                new_user = User(email=email, password=password, nickname=nickname)
                db.session.add(new_user)
                db.session.commit()
                return jsonify({"msg": "Usuario registrado exitosamente"}), 201 
            else:
                return jsonify({"msg": "Apodo ya se encuentra registrado"}), 409
        else:
            return jsonify({"msg": "Email ya se encuentra registrado"}), 409

    
    except Exception as e:

        return jsonify({"error": "Error interno del servidor", "details": str(e)}), 500
    



#Jessica
@api.route('/profile/<string:email>', methods=['GET'])
def get_profile(email):

    try:
        print(email)
        print("Email del usuario")  
        user = User.query.filter_by(email=email).first()
        if not user:
            print("Usuario no encontrado")  
            return jsonify({"error": "Usuario no encontrado"}), 404

        
        print("Datos del perfil:", user.serialize()) 
        return jsonify(user.serialize()), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500






