from django.urls import path
from .views import getPostView, writePostView, getPostDetailView

urlpatterns = [
    path("", getPostView.as_view()),
    path("write-post", writePostView.as_view()),
    path("posts/<int:id>", getPostDetailView.as_view()),
]
