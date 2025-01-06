from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


# Create your models here.


class UserDetail(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=11, unique=True)
    address = models.CharField(max_length=11, unique=True)
    country = models.CharField(max_length=11, unique=True)
    city = models.CharField(max_length=11, unique=True)
    def __str__(self):
        return self.user.username
