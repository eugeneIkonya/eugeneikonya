from flask import render_template, Blueprint
from flask_mail import Message, Mail
from flask_login import current_user
from app import mail

core = Blueprint('core',__name__)

@core.route('/')
def index():
    return render_template('index.html')

@core.route('/sendmail')
def send_mail():
    msg = Message(subject='HelloMail', recipients=['eugeneikonya@gmail.com'])
    msg.body = 'Hello Flask message sent from Flask-Mail'
    mail.send(msg)
    return 'Mail sent!'