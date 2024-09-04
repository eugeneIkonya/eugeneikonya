from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail


app = Flask(__name__)

from app.config import DevelopmentConfig, ProductionConfig

app.config.from_object(DevelopmentConfig)


mail = Mail(app)


db = SQLAlchemy(app)
Migrate(app,db)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'



from app.core.views import core
app.register_blueprint(core)

from app.error_pages.handlers import error_pages
app.register_blueprint(error_pages)

from app.auth.views import auth
app.register_blueprint(auth)

from app.hundred_days.views import hundred_days
app.register_blueprint(hundred_days)


from app.utils.comands import create_admin