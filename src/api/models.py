from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id_user = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    nickname = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=True)
    lastname = db.Column(db.String(50), nullable=True)
    birthday = db.Column(db.Date, nullable=True)
    role = db.Column(db.String(50), nullable=False, default="usuario")
    avatar_url = db.Column(db.String(255), nullable=False, default="default_avatar_url")
    membership = db.Column(db.String(20), nullable=False, default="free")
    es_mayor = db.Column(db.Boolean, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    
    forums = db.relationship('Forum', back_populates='user', lazy=True, cascade="all, delete-orphan")
    comments = db.relationship('Comment', backref='user', lazy=True, cascade="all, delete-orphan")
    advertisings = db.relationship('Advertising', backref='user', lazy=True, cascade="all, delete-orphan")
    favorites = db.relationship('Favorite', backref='user', lazy=True, cascade="all, delete-orphan")
    invoices = db.relationship('Invoice', backref='user', lazy=True, cascade="all, delete-orphan") 

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id_user": self.id_user,
            "email": self.email,
            "nickname": self.nickname,
            "name": self.name,
            "lastname": self.lastname,
            "birthday": self.birthday.isoformat() if self.birthday else None,
            "role": self.role,
            "avatar_url": self.avatar_url,
            "membership": self.membership,
            "is_active": self.is_active,
        }

class Forum(db.Model):
    id_forum = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    content = db.Column(db.Text, nullable=False)
    creation_date = db.Column(db.Date, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)  
    user = db.relationship("User")

    comments = db.relationship('Comment', backref='forum', lazy=True, cascade="all, delete-orphan", order_by="Comment.id_comment.asc()")
    favorites = db.relationship('Favorite', backref='forum', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Forum {self.title}>'

    def serialize(self):
        return {
            "id_forum": self.id_forum,
            "title": self.title,
            "image_url": self.image_url,
            "content": self.content,
            "creation_date": str(self.creation_date),
            "id_user": self.id_user,
            "nickname": self.user.nickname if self.user else None,
            "comments": [comment.serialize() for comment in self.comments if comment.parent_id is None]

        }

class Comment(db.Model):
    id_comment = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    content = db.Column(db.Text, nullable=False)
    creation_date = db.Column(db.Date, nullable=False)
    modification_date = db.Column(db.Date, nullable=True)
    id_forum = db.Column(db.Integer, db.ForeignKey('forum.id_forum'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("comment.id_comment"), nullable=True)

    # Relación con comentarios hijos
    parent = db.relationship("Comment", remote_side=[id_comment], backref="children")

    def __repr__(self):
        return f'<Comment {self.id_comment}>'

    def serialize(self, visited=None):
        if visited is None:
            visited = set()

        if self.id_comment in visited:
            return None

        visited.add(self.id_comment)

        return {
            "id_comment": self.id_comment,
            "content": self.content,
            "creation_date": str(self.creation_date),
            "modification_date": str(self.modification_date) if self.modification_date else None,
            "id_user": self.id_user,
            "id_forum": self.id_forum,
            "nickname": self.user.nickname if self.user else None,
            "parent_id": self.parent_id,
            "children": [
                child.serialize(visited)
                for child in sorted(self.children, key=lambda x: x.creation_date)
            ] if self.children else [],
        }

class Advertising(db.Model):
    id_advertising = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    creation_date = db.Column(db.Date, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)  

    favorites = db.relationship('Favorite', backref='advertising', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Advertising {self.title}>'

    def serialize(self):
        return {
            "id_advertising": self.id_advertising,
            "title": self.title,
            "image_url": self.image_url,
            "content": self.content,
            "creation_date": self.creation_date,
            "active": self.active,
            "id_user": self.id_user,
            "nickname": self.user.nickname if self.user else None,
        }

class Favorite(db.Model):
    id_favorite = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    id_forum = db.Column(db.Integer, db.ForeignKey('forum.id_forum'), nullable=True)  
    id_advertising = db.Column(db.Integer, db.ForeignKey('advertising.id_advertising'), nullable=True)  
    id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)  

    def __repr__(self):
        return f'<Favorite {self.id_favorite}>'

    def serialize(self):
        return {
            "id_favorite": self.id_favorite,
            "id_forum": self.id_forum,
            "id_advertising": self.id_advertising,
            "id_user": self.id_user,
        }

class Invoice(db.Model):
    id_invoce = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    amount = db.Column(db.Integer, nullable=True)
    concept = db.Column(db.String(255), nullable=True)  
    status = db.Column(db.String(50), nullable=True)  
    payment_date = db.Column(db.Date, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)  

    def __repr__(self):
        return f'<Invoice {self.id_invoce}>'

    def serialize(self):
        return {
            "id_invoce": self.id_invoce,
            "amount": self.amount,
            "concept": self.concept,
            "status": self.status,
            "payment_date": self.payment_date.isoformat() if self.payment_date else None,
            "id_user": self.id_user,
        }
