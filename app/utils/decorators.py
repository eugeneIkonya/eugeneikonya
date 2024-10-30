
from functools import wraps
from flask import flash, redirect, url_for
from flask_login import current_user


def account_verified(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if not current_user.is_verified:
          flash('Account not verified!')
          return redirect(url_for('auth.inactive'))
        return func(*args, **kwargs)
    return decorated_function

def admin_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            flash('You must be logged in to access this page.')
            return redirect(url_for('auth.login'))

        if not current_user.is_admin:
            flash('User is not An Admin')
            return redirect(url_for('core.index'))
        return func(*args, **kwargs)
    return decorated_function