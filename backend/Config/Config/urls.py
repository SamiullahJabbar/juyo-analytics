"""Config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from User import urls
from notification import urls
from webScr import urls
from language import urls
from language.views import ChangeLanguageView
from django.conf.urls.i18n import i18n_patterns


urlpatterns = [
    path('admin/', admin.site.urls),
]

# i18n patterns se language-specific URLs handle honge
urlpatterns += i18n_patterns(
    path('api/ChangeLanguageView/', ChangeLanguageView.as_view(), name='change_language'),
    path('api/', include('User.urls')),
    path('api/', include('notification.urls')),
    path("api/mongo/", include('mongodb.urls')),
    path('api/', include('webScr.urls')),
    path('api/', include('ml_models.urls')),
    path('api/', include('Dataset.urls')),
    path('api/', include('language.urls')),
)
