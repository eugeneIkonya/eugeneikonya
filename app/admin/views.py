from flask import render_template, Blueprint, request
from app import db
from app.models import User, Feedback
from app.utils.decorators import admin_required

admin = Blueprint('admin', __name__,url_prefix='/admin')

@admin.route('/')
@admin_required
def index():
    return render_template('admin/dashboard.html')


@admin.route('/users')
@admin_required
def users():
    all_users = db.session.query(User).all()
    return render_template('admin/users/index.html', users = all_users)

@admin.route('/user/<username>')
@admin_required
def edit_user(user_id):
    pass

@admin.route('/users/feedback')
@admin_required
def feedback():
    page = request.args.get('page',1,type=int)
    all_feedback = db.session.query(Feedback).order_by(Feedback.created_at.desc()).paginate(page=page, per_page=10, error_out=False)
    return render_template('admin/feedback.html', feedback = all_feedback)
