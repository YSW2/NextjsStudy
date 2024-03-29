from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import Post


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class getPostView(ListAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostListSerializer
    pagination_class = StandardResultsSetPagination


class getPostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = "id"


class writePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        request.data["author"] = user.id
        posted_data = PostSerializer(data=request.data)

        if posted_data.is_valid():
            posted_data.save()

            return Response({"message": "success"}, status=status.HTTP_200_OK)

        return Response({"message": "error"}, status=status.HTTP_400_BAD_REQUEST)
