from django.urls import path

from .views import MongoViewSet

urlpatterns = [
    path("test/", MongoViewSet.as_view(), name="test-mongo-view" )
]
