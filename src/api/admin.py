  
import os
from flask_admin import Admin
from .models import db, User
from .models import db, Forum
from .models import db, Comment
from .models import db, Advertising
from .models import db, Favorite
from .models import db, Invoice





from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Forum, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Advertising, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(Invoice, db.session))






    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))