from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .utils import encrypt_data
import json


class getLoginView(APIView):
    def post(self, request, format=None):
        loginData = loginSerializer(data=request.data)
        if loginData.is_valid():
            userId = loginData.data.get("userId")
            userPw = loginData.data.get("userPw")
            print(userId, userPw)

        return Response({}, status=status.HTTP_200_OK)


class getJoinView(APIView):
    def post(self, request, format=None):
        joinData = joinSerializer(data=request.data)
        if joinData.is_valid():
            userId = joinData.data.get("userId")
            userPw = joinData.data.get("userPw")
            userName = joinData.data.get("userName")
            userEmail = joinData.data.get("userEmail")

            User.objects.create(
                userId=userId,
                userPw=encrypt_data(userPw),
                userName=userName,
                userEmail=userEmail,
            )

            return Response({"message": "success"}, status=status.HTTP_200_OK)

        return Response({"message": "error"}, status=status.HTTP_400_BAD_REQUEST)


class checkIdView(APIView):
    def post(self, request, format=None):
        userId = json.loads(request.body).get("userId")
        if not User.objects.filter(userId=userId).exists():
            return Response({"success": True}, status=status.HTTP_200_OK)

        return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
