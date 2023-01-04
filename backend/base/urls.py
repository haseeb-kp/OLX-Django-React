from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView
#     # TokenRefreshView,
# )


urlpatterns = [
    path("user_login", views.user_login, name="user_login"),
    path("user_register", views.user_register, name="user_register"),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
