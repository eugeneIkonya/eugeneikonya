from flask import render_template, Blueprint, request, jsonify
from wtforms.validators import email

from app.models import Feedback
from app import  db
core = Blueprint('core',__name__)

@core.route('/')
def index():
    return render_template('index.html')

@core.route('/send-feedback/', methods=['POST'])
def send_feedback():
    data = request.get_json()
    feedback = Feedback(
        name = data['name'],
        message= data['feedback'],
        email = ''
    )
    db.session.add(feedback)
    db.session.commit()

    return jsonify({'message':'Feedback Sent'})

