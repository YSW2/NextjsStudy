from django.shortcuts import render
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
import json


class getLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)  # 사용자 세션 생성 및 로그인
            return Response(
                {
                    "login": True,
                    "userId": user.userId,  # 혹은 user.userId, 모델에 따라 다를 수 있음
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"login": False, "error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )


class getJoinView(APIView):
    def post(self, request, format=None):
        joinData = UserSerializer(data=request.data)
        if joinData.is_valid():
            user = joinData.save()

            return Response({"message": "success"}, status=status.HTTP_200_OK)

        return Response({"message": "error"}, status=status.HTTP_400_BAD_REQUEST)


class checkIdView(APIView):
    def post(self, request, format=None):
        userId = json.loads(request.body).get("userId")
        if not User.objects.filter(userId=userId).exists():
            return Response({"success": True}, status=status.HTTP_200_OK)

        return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
