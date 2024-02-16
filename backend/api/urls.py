from django.urls import path
from .views import getLoginView

urlpatterns = [path("login", getLoginView.as_view())]
