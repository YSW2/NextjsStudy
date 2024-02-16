from rest_framework import serializers
from .models import User


class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("userId", "userPw")
