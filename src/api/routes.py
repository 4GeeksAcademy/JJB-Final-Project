"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import re
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import secrets
from datetime import datetime, timedelta
from app import mail
from flask_mail import Message

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


@api.route("/request-password-reset", methods=["POST"])
def request_password_reset():
    try:
        email = request.json.get("email", None)
        if not email:
            return jsonify({"error": "Correo requerido"}), 400
        
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "Si el correo existe, se enviará un enlace para restablecer la contraseña."}), 200
        
        token, expiration = generate_reset_token()

        
        # Falta agregar estos campos al user
        # user.reset_token = token
        # user.reset_token_expiration = expiration
        # db.session.commit()

        
        reset_url = f"https://studious-lamp-v5w4jqrxgvv3w67q-3001.app.github.dev/api/reset-password?token={token}"
        #send_reset_email(user.email, reset_url)

        return jsonify({"msg": "Se envió un correo para restablecer la contraseña"}), 200


    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "details": str(e)}), 500


def generate_reset_token():
    token = secrets.token_urlsafe(32)  
    expiration = datetime.now() + timedelta(hours=1) 
    return token, expiration

def send_reset_email(to_email, reset_url):
    try:
        msg = Message(
            subject="Solicitud para restablecer contraseña",
            sender="no-reply@domain.com",
            recipients=[to_email],
        )
        msg.body = f"""Hola,

            Recibimos una solicitud para restablecer tu contraseña. Haz clic en el enlace de abajo para continuar:

            {reset_url}

            Si no solicitaste esto, puedes ignorar este mensaje.

            Gracias
            """
        mail.send(msg)
    except Exception as e:
        print(f"Error enviando correo: {e}")