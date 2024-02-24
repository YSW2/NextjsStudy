from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import PostSerializer


class getPostView(APIView):
    pass


class writePostView(APIView):
    def post(self, request, format=None):
        posted_data = PostSerializer(data=request.data)

        print(posted_data)
        if posted_data.is_valid():
            posted_data.save()

        return Response({}, status=status.HTTP_200_OK)
