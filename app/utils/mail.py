from app import app, mail
from flask_mail import Message

def send_email(subject, recipients, template):
    message = Message(
        subject,
        recipients=recipients,
        html=template,
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    mail.send(message)
