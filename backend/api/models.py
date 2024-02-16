from django.db import models

# Create your models here.


class User(models.Model):
    userId = models.CharField(max_length=20, unique=True)
    userPw = models.CharField(max_length=20)
    userName = models.CharField(max_length=20)
    userEmail = models.CharField(max_length=50)
