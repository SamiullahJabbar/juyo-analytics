from django.urls import path
from .views import GenerateAndSendPDFView

urlpatterns = [
    path('sendemail/', GenerateAndSendPDFView.as_view(), name='send-test-email'),
]
