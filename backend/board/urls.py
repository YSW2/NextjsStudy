from django.urls import path
from .views import getPostView, writePostView

urlpatterns = [
    path("", getPostView.as_view()),
    path("write-post", writePostView.as_view()),
]
