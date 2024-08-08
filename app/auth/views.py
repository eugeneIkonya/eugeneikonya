from flask import Blueprint, render_template, url_for,flash,redirect,request
from flask_login import login_user,login_required,logout_user,current_user
from app import db
from app.models import User
from app.auth.forms import LoginForm, SignupForm, UpdateUserForm
from app.auth.picture_handler import add_profile_pic

auth = Blueprint('auth',__name__)

@auth.route('/login',methods=['GET','POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = db.session.query(User).filter_by(email=form.email.data).first()

        if user is not None and user.check_password(form.password.data):
            login_user(user)
            flash('Logged In!')

            next = request.args.get('next')

            if next is None or not isinstance(next, str) or not next.startswith('/'):
                next = url_for('core.index')

            return redirect(next)

    return render_template('auth/login.html', form=form)

@auth.route('/signup',methods=['GET','POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        user = User(email=form.email.data,
                    username=form.username.data,
                    first_name=form.first_name.data,
                    last_name=form.last_name.data,
                    password=form.password.data)
        
        db.session.add(user)
        db.session.commit()
        flash('Thanks for signing up!')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/signup.html',form=form)

@auth.route('/account',methods=['GET','POST'])
@login_required
def account():
    form = UpdateUserForm()

    if form.validate_on_submit():
        if form.profile_picture.data:
            username = current_user.username
            profile_picture = add_profile_pic(form.profile_picture.data, username)
            if profile_picture:
                current_user.profile_picture = profile_picture
            else:
                flash('Profile Picture upload failed!')
            
            current_user.profile_picture = profile_picture
        
        current_user.email = form.email.data
        current_user.username = form.username.data
        current_user.first_name = form.first_name.data
        current_user.last_name = form.last_name.data

        db.session.commit()
        flash('User Account Updated!')
        return redirect(url_for('auth.account'))

    elif request.method == 'GET':
        form.email.data = current_user.email
        form.username.data = current_user.username
        form.first_name.data = current_user.first_name
        form.last_name.data = current_user.last_name

    return render_template('auth/account.html', form=form)

@auth.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('core.index'))