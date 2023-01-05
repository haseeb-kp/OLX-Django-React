from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView
#     # TokenRefreshView,
# )


urlpatterns = [
    path("user_login", views.user_login.as_view(), name="user_login"),
    path("admin_login", views.admin_login.as_view(), name="admin_login"),
    path("user_register", views.user_register, name="user_register"),
    path("profile/<int:id>", views.profile, name="profile"),
    path("userDelete/<int:id>", views.userDelete, name="userDelete"),
    path("getUsers", views.getUsers, name="getUsers"),
    path("addImage/<int:id>", views.addImage, name="addImage"),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
