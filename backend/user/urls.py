from django.urls import path
from .views import getLoginView, getJoinView, checkIdView

urlpatterns = [
    path("login", getLoginView.as_view()),
    path("join", getJoinView.as_view()),
    path("id-check", checkIdView.as_view()),
]
