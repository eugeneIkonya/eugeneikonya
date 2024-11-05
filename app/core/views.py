from flask import render_template, Blueprint, request, jsonify, session

from app.models import Feedback, VisitSession
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

@core.before_request
def before_request():
    session.permanent = True

    if 'session_id' not in session:
        new_session = VisitSession(ip=request.remote_addr, pages='')
        db.session.add(new_session)
        db.session.commit()
        session['session_id'] = new_session.id
        session['pages'] = []

@core.route('/track',methods=['GET','POST'])
def track_page():
    data = request.get_json()
    page_name = data['page_name'].replace('by EugeneIkonya - ','')
    duration = data['duration']

    temp = session['pages']
    temp.append(f'{page_name}-{duration}')
    session['pages'] = temp

    if session['session_id']:
        current_session = db.session.query(VisitSession).get(session['session_id'])
        if current_session:
            current_session.pages = ', '.join(session['pages'])
            db.session.commit()

    return jsonify({'ip':session['ip_address'],'page':session['pages']})


