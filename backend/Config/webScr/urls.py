from django.urls import path
from .views import HotelScraperAPIView
urlpatterns = [
    path('scrape/', HotelScraperAPIView.as_view(), name='web-scraping'),
]
