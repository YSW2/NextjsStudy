from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["userId", "userName", "userEmail", "password"]

    def create(self, validated_data):
        # 비밀번호를 제외한 데이터로 사용자 생성
        user = User.objects.create_user(
            userId=validated_data["userId"],
            userName=validated_data.get("userName"),
            userEmail=validated_data.get("userEmail"),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    userId = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, trim_whitespace=False
    )

    def validate(self, attrs):
        userId = attrs.get("userId")
        password = attrs.get("password")

        if userId and password:
            # authenticate 메서드를 사용하여 사용자 인증 시도
            user = authenticate(
                request=self.context.get("request"), username=userId, password=password
            )

            # 인증 실패 시 오류 메시지 반환
            if not user:
                msg = "Unable to log in with provided credentials."
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = 'Must include "userId" and "password".'
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs
