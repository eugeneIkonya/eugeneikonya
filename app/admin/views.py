from flask import render_template, Blueprint
from app import db
from app.models import User

admin = Blueprint('admin', __name__,url_prefix='/admin')

@admin.route('/')
def index():
    return render_template('admin/dashboard.html')

@admin.route('/users')
def users():
    all_users = db.session.query(User).all()
    return render_template('admin/users/index.html', users = all_users)

@admin.route('/user/<username>')
def edit_user(user_id):
    pass
