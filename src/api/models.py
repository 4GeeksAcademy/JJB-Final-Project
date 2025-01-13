from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id_user = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id_user": self.id_user,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }


class Perfil(db.Model):
    id_user = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(255), nullable=False)  
    nickname = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    role = db.Column(db.String(50), nullable=False)  
    avatar_url = db.Column(db.String(255), nullable=False, default="default_avatar_url")
    membership = db.Column(db.String(20), nullable=False, default="free")

    def __repr__(self):
        return f'<Perfil {self.nickname}>'

    def serialize(self):
        return {
            "id_user": self.id_user,
            "nickname": self.nickname,
            "name": self.name,
            "lastname": self.lastname,
            "birthday": self.birthday.isoformat() if self.birthday else None,
            "role": self.role,
            "avatar_url": self.avatar_url,
            "membership": self.membership,
        }
