from django.db import models

# Create your models here.


class User(models.Model):
    userId = models.CharField(max_length=20)
    userPw = models.CharField(max_length=64)
    userName = models.CharField(max_length=20)
    userEmail = models.CharField(max_length=50)
