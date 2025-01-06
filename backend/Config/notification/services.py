from django.core.mail import send_mail
from django.conf import settings
from twilio.rest import Client


def send_registration_email(user):
    subject = "Welcome to Our Platform"
    message = f"Hello {user.username},\n\nThank you for registering with us."
    recipient_list = [user.email]
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)



def send_whatsapp_notification(user):
    account_sid = 'your_account_sid'
    auth_token = 'your_auth_token'
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        body=f"Hello {user.username}, you have successfully registered!",
        from_='whatsapp:+14155238886',  # Twilio sandbox number or your WhatsApp business number
        to=f'whatsapp:{user.phone_number}'  # User's phone number
    )
