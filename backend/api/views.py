from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


class getLoginView(APIView):
    def post(self, request, format=None):
        loginData = loginSerializer(data=request.data)
        if loginData.is_valid():
            userId = loginData.data.get("userId")
            userPw = loginData.data.get("userPw")
            print(userId, userPw)

        return Response({}, status=status.HTTP_200_OK)
