from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserViewSet,PasswordUpdateView
from .views import LoginView


router = DefaultRouter()
# router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    path('userData/', UserViewSet.as_view(), name='protected'),
    path('', include(router.urls)),
    path('update-password/', PasswordUpdateView.as_view(), name='update-password'),
]
