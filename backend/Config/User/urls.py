from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginView, UserViewSet,PasswordUpdateView
from .views import LoginView
from .registration import RegisterView
from .otp import OTPVerificationView
from .password_rest import PasswordResetRequestView,PasswordResetConfirmView

router = DefaultRouter()
# router.register('users', UserViewSet, basename='user')

urlpatterns = [
    # path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user_register/', RegisterView.as_view(), name='register'),
    path('userData/', UserViewSet.as_view(), name='protected'),
    path('', include(router.urls)),
    path('update-password/', PasswordUpdateView.as_view(), name='update-password'),
    path('verify-otp/', OTPVerificationView.as_view(), name='verify_otp'),
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
