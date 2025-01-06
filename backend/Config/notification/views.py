from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.http import HttpResponse
from fpdf import FPDF
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import os
from.models import UserDetail

from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class GenerateAndSendPDFView(APIView):
    permission_classes = [IsAuthenticated]  # User must be logged in

    def post(self, request):
        # Fetch the logged-in user's email
        user = request.user
        email = user.email

        if not email:
            return Response(
                {"error": "User email not found."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get content from request payload
        content = request.data.get("content", "")
        if not content:
            return Response(
                {"error": "Missing content in the payload"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate the PDF
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=14)
        pdf.multi_cell(0, 10, txt=f"Content:\n\n{content}", align='L')

        # Save PDF to a temporary file
        pdf_file_path = os.path.join(settings.BASE_DIR, "generated_content.pdf")
        pdf.output(pdf_file_path)

        try:
            # Send email with PDF as attachment
            subject = "Your Requested PDF"
            message = "Dear User,\n\nPlease find your requested PDF attached.\n\nBest Regards,\nYour Company"
            email_message = EmailMessage(
                subject=subject,
                body=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email]
            )
            email_message.attach_file(pdf_file_path)
            email_message.send()

            # Clean up the temporary file
            if os.path.exists(pdf_file_path):
                os.remove(pdf_file_path)

            return Response(
                {"success": f"PDF generated and sent to {email} successfully!"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            # Clean up the temporary file in case of error
            if os.path.exists(pdf_file_path):
                os.remove(pdf_file_path)

            return Response(
                {"error": f"Failed to send email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# from twilio.rest import Client
# from django.conf import settings
#
#
# class GenerateAndSendPDFView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def post(self, request):
#         user = request.user
#         email = user.email
#         phone_number = user_UserDetail.phone_number  # Assuming the user model has phone_number field
#
#         if not email:
#             return Response(
#                 {"error": "User email not found."},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#
#         if not phone_number:
#             return Response(
#                 {"error": "User phone number not found."},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#
#         content = request.data.get("content", "")
#         if not content:
#             return Response(
#                 {"error": "Missing content in the payload"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#
#         # Generate the PDF
#         pdf = FPDF()
#         pdf.add_page()
#         pdf.set_font("Arial", size=14)
#         pdf.multi_cell(0, 10, txt=f"Content:\n\n{content}", align='L')
#
#         # Save PDF to a temporary file
#         pdf_file_path = os.path.join(settings.BASE_DIR, "generated_content.pdf")
#         pdf.output(pdf_file_path)
#
#         try:
#             # Send email with PDF as attachment
#             subject = "Your Requested PDF"
#             message = ",\n\n your requested PDF attached.\n\nBest Regards,\nYour Company"
#             email_message = EmailMessage(
#                 subject=subject,
#                 body=message,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 to=[email]
#             )
#             email_message.attach_file(pdf_file_path)
#             email_message.send()
#
#             # Send WhatsApp message using Twilio
#             whatsapp_message = f"Hello! Your requested PDF is ready. Please check your email for the PDF attachment."
#             client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
#             client.messages.create(
#                 body=whatsapp_message,
#                 from_=f"whatsapp:{settings.TWILIO_PHONE_NUMBER}",
#                 to=f"whatsapp:{phone_number}"
#             )
#
#             # Clean up the temporary file
#             if os.path.exists(pdf_file_path):
#                 os.remove(pdf_file_path)
#
#             return Response(
#                 {
#                     "success": f"PDF generated, sent to {email} via email, and WhatsApp message sent to {phone_number} successfully!"},
#                 status=status.HTTP_200_OK
#             )
#         except Exception as e:
#             # Clean up the temporary file in case of error
#             if os.path.exists(pdf_file_path):
#                 os.remove(pdf_file_path)
#             return Response(
#                 {"error": f"Failed to send email and/or WhatsApp message: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
