"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User,Forum,Comment,Advertising,Invoice
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import re , datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import os, cloudinary, cloudinary.uploader


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),


)


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
        
        user = User.query.filter_by(email = email).first()
        if user is None:
            return jsonify({"msg": "Email o password incorrectos"}), 404

        valid_password = current_app.bcrypt.check_password_hash(user.password, password)
        if valid_password is False:
            return jsonify({"msg": "Email o password incorrectos"}), 404

        access_token = create_access_token(identity = email)
        return jsonify(access_token=access_token),200
    
    except Exception as e:

        return jsonify({"error": "Error interno del servidor", "details": str(e)}), 500
    
    
@api.route("/register", methods=["POST"])
def register():

    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        nickname = request.json.get("nickname", None)
        es_mayor = request.json.get("es_mayor", None)

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
        
        if not es_mayor:
            return jsonify({"error": "Confirmación de mayoria de edad requerida"}), 400

        user = User.query.filter_by(email = email).first()
        if user is None:
            user_nickname = User.query.filter_by(nickname = nickname).first()
            if user_nickname is None:
                new_user = User(
                    email=email, 
                    password=current_app.bcrypt.generate_password_hash(password).decode('utf-8'), 
                    nickname=nickname,
                    es_mayor=es_mayor
                )
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
@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():

    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado: {email}")  
        user = User.query.filter_by(email=email).first()
        if not user: 
            return jsonify({"error": "Usuario no encontrado"}), 404

        return jsonify(user.serialize()), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500
    
    
#Jessica get foros
@api.route('/forum', methods=['GET'])
@jwt_required()
def get_forum():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para foros: {email}")  
        forums = Forum.query.all()
        if not forums:
            return jsonify({"error": "No se encontraron foros"}), 404
        
        serialized_forums = [forum.serialize() for forum in forums]
        return jsonify(serialized_forums), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500
    
#get 1 forum
@api.route('/forum/<int:id_foro>', methods=['GET'])
@jwt_required()
def get_forum_by_id(id_foro):
    try:
        forum = Forum.query.filter_by(id_forum=id_foro).first()
        if not forum:
            print("foro no encontrado")  
            return jsonify({"error": "Foro no encontrado"}), 404

        return jsonify(forum.serialize()), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500
    
@api.route('/forum', methods=['POST'])
@jwt_required()
def create_forum():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para create_forum: {email}")  
        data = request.get_json()
        print(data)
        title = data.get("title")
        content = data.get("content")

        if not title or not content:
            return jsonify({"error": "Faltan datos obligatorios (title, content)"}), 400
        
        user = User.query.filter_by(email=email).first()
        if not user: 
            return jsonify({"error": "Usuario no encontrado"}), 404

        new_forum = Forum(
            title=title,
            content=content,
            creation_date=datetime.date.today(),
            id_user=user.id_user
        )

        db.session.add(new_forum)
        db.session.commit()

        return jsonify({"msg": "Foro creado exitosamente", "forum": new_forum.serialize()}), 201

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500
    
#put 1 foro
@api.route('/forum/<int:id_foro>', methods=['PUT'])
@jwt_required()
def update_forum(id_foro):
    try:
        forum = Forum.query.filter_by(id_forum=id_foro).first()
        if not forum:
            return jsonify({"error": "Foro no encontrado"}), 404

        data = request.get_json()

        forum.title = data.get('title', forum.title)
        forum.content = data.get('content', forum.content)
        forum.image_url = data.get('image_url', forum.image_url)

        db.session.commit()
        return jsonify(forum.serialize()), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500

#delete 1 forum
@api.route('/forum/<int:id_foro>', methods=['DELETE'])
@jwt_required()
def delete_forum(id_foro):
    try:
        forum = Forum.query.filter_by(id_forum=id_foro).first()
        if not forum:
            return jsonify({"error": "Foro no encontrado"}), 404

        db.session.delete(forum)
        db.session.commit()
        return jsonify({"message": "Foro eliminado exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500



@api.route('/comment', methods=['POST'])
@jwt_required()
def create_comment():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para create_comment: {email}")  
        data = request.get_json()
        print(data)
        
        content = request.json.get("content", None)
        id_forum = request.json.get("id_forum", None)
        parent_id = request.json.get("parent_id", None)

        if not content or not id_forum:
            return jsonify({"error": "Faltan datos obligatorios (content, id_forum)"}), 400
        
        if parent_id:
            parent_comment = Comment.query.get(parent_id) 
            if not parent_comment:
                return jsonify({"error": "El comentario padre no existe"}), 400

        print("if not content or not id_forum")
        
        user = User.query.filter_by(email=email).first()
        if not user: 
            return jsonify({"error": "Usuario no encontrado"}), 404

        print(f"user: {user}")  

        new_comment = Comment(
            content = content,
            creation_date=datetime.date.today(),
            id_forum = id_forum,
            id_user = user.id_user,
            parent_id = parent_id
        )

        print(f"new_comment: {new_comment}") 
        db.session.add(new_comment)

        print("Antes de hacer commit") 
        db.session.commit()

        return jsonify({"msg": "comentario creado exitosamente", "new_comment": new_comment.serialize()}), 201

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500

@api.route('/comment', methods=['PUT'])
@jwt_required()
def update_comment():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para update_comment: {email}")  

        comment_index = request.json.get("comment_index", None)
        id_forum = request.json.get("id_forum", None)
        content = request.json.get("content", None)

        print(f"Datos recibidos: comment_index={comment_index}, id_forum={id_forum}, content={content}")
        if comment_index is None or id_forum is None or not content:
            return jsonify({"error": "Faltan datos obligatorios (content, id_forum, comment_index)"}), 400
              
        comment = Comment.query.filter_by(id_comment=comment_index).first()
        print(f"comment: {comment.id_comment}") 
        if not comment: 
            return jsonify({"error": "Comentario no encontrado"}), 404

        comment.content = content
        comment.modification_date = datetime.date.today()

        db.session.commit()

        return jsonify({"msg": "Comentario actualizado exitosamente", "new_comment": comment.serialize()}), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500


@api.route('/comment', methods=['DELETE'])
@jwt_required()
def delete_comment():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para delete_comment: {email}")  

        comment_index = request.json.get("comment_index", None)

        print(f"Datos recibidos: comment_index={comment_index}")
        if comment_index is None:
            return jsonify({"error": "Faltan datos obligatorios (comment_index)"}), 400
              
        comment = Comment.query.filter_by(id_comment=comment_index).first()
        print(f"comment: {comment.id_comment}") 
        if not comment: 
            return jsonify({"error": "Comentario no encontrado"}), 404

        db.session.delete(comment)
        db.session.commit()

        return jsonify({"msg": "Comentario borrado exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500


@api.route('/upload', methods=['POST'])
def upload_image():
    image = request.files["image"]

    if not image:
        return jsonify({"error":"The image is required"}),400

    result = cloudinary.uploader.upload(image)

    return jsonify(result["secure_url"]), 200

        
@api.route('/advertising', methods=['GET'])
@jwt_required()
def get_advertising():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para publicidad: {email}")  
        advertising = Advertising.query.all()
        if not advertising:
            return jsonify({"error": "No se encontro publicidad"}), 404
        
        serialized_advertising = [advertising.serialize() for advertising in advertising]
        return jsonify(serialized_advertising), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500


@api.route('/advertising', methods=['POST'])
@jwt_required()
def create_advertising():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para create_advertising: {email}")  
        data = request.get_json()
        print(data)
        title = data.get("title")
        content = data.get("content")
        image_url = data.get("image_url")

        if not title or not content:
            return jsonify({"error": "Faltan datos obligatorios (title, content)"}), 400
        
        user = User.query.filter_by(email=email).first()
        if not user: 
            return jsonify({"error": "Usuario no encontrado"}), 404

        new_advertising = Advertising(
            title=title,
            content=content,
            creation_date=datetime.date.today(),
            id_user=user.id_user,
            image_url=image_url,
            active=True
        )

        db.session.add(new_advertising)
        db.session.commit()

        return jsonify({"msg": "Publicidad creada exitosamente", "advertising": new_advertising.serialize()}), 201

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500
    
@api.route('/advertising', methods=['PUT'])
@jwt_required()
def update_advertising():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para update_advertising: {email}")  

        id_advertising = request.json.get("id_advertising", None)
        title = request.json.get("title", None)
        content = request.json.get("content", None)
        image_url = request.json.get("image", None)


        print(f"Datos recibidos: id_advertising={id_advertising}, title={title}, content={content}")
        
        if id_advertising is None or not title or not content:
            return jsonify({"error": "Faltan datos obligatorios (id_advertising, title, content)"}), 400
              
        advertising = Advertising.query.filter_by(id_advertising=id_advertising).first()
        print(f"advertising: {advertising}") 
        if not advertising: 
            return jsonify({"error": "Publicidad no encontrada"}), 404

        advertising.title = title
        advertising.content = content
        advertising.image.url = image_url

        advertising.creation_date = datetime.date.today()

        db.session.commit()

        return jsonify({"msg": "Publicidad actualizada exitosamente", "new_advertising": advertising.serialize()}), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500

    

@api.route('/advertising', methods=['DELETE'])
@jwt_required()
def delete_advertising():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para delete_advertising: {email}")  

        id_advertising = request.json.get("id_advertising", None)

        print(f"Datos recibidos: id_advertising={id_advertising}")

        if id_advertising is None:
            return jsonify({"error": "Faltan datos obligatorios (id_advertising)"}), 400
              
        id_advertising = Advertising.query.filter_by(id_advertising=id_advertising).first()
        print(f"Advertising: {id_advertising}") 
        if not id_advertising: 
            return jsonify({"error": "Publicidad no encontrada"}), 404

        db.session.delete(id_advertising)
        db.session.commit()

        return jsonify({"msg": "Publicidad borrada exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500
    

@api.route('/invoices', methods=['GET'])
@jwt_required()
def get_invoices():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para las facturas: {email}")  
        invoices = Invoice.query.all()
        if not invoices:
            return jsonify({"error": "No se encontraron facturas"}), 404
        
        serialized_invoices = [invoices.serialize() for invoices in invoices]
        return jsonify(serialized_invoices), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500

    
@api.route('/invoices', methods=['POST'])
@jwt_required()
def create_invoices():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para create_invoices: {email}")  
        data = request.get_json()
        print(data)
        amount = data.get("amount")
        concept = data.get("concept")
        status = data.get("status")

        if not amount or not concept:
            return jsonify({"error": "Faltan datos obligatorios (amount, concept, status)"}), 400
        
        user = User.query.filter_by(email=email).first()
        if not user: 
            return jsonify({"error": "Usuario no encontrado"}), 404

        new_invoice = Invoice(
            amount=amount,
            concept=concept,
            status=False,
            id_user=user.id_user,
        )

        db.session.add(new_invoice)
        db.session.commit()

        return jsonify({"msg": "Factura creada exitosamente", "advertising": new_invoice.serialize()}), 201

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500


@api.route('/invoices', methods=['PUT'])
@jwt_required()
def update_invoices():
    try:
        email = get_jwt_identity()
        print(f"Usuario autenticado para update_invoices: {email}")  

        id_invoce = request.json.get("id_invoce", None)
        amount = request.json.get("amount", None)
        concept = request.json.get("concept", None)
        status = request.json.get("status", None)
        payment_date = request.json.get("payment_date", None)


        print(f"Datos recibidos: id_invoce={id_invoce}, amount={amount}, concept={concept}, status={status}, payment_date={payment_date}")
        
        if id_invoce is None or not amount or not concept or not status or not payment_date:
            return jsonify({"error": "Faltan datos obligatorios (id_invoce, amount, concept, status, payment_date)"}), 400
              
        invoices = Invoice.query.filter_by(id_invoce=id_invoce).first()
        print(f"invoices: {invoices}") 
        if not invoices: 
            return jsonify({"error": "Factura no encontrada"}), 404

        invoices.amount = amount
        invoices.concept = concept
        invoices.status = status
        invoices.payment_date = payment_date

        db.session.commit()

        return jsonify({"msg": "factura actualizada exitosamente", "new_invoices": invoices.serialize()}), 200

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "message": str(e)}), 500





