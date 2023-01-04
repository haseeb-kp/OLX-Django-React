# from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status



User = get_user_model()

# class ListUsers(APIView):

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def user_login(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def user_register(request):
    data = request.data
    # try:
    print(data['username'],data['email'])
    user = User.objects.create(
        # first_name = data['name'],
        username = data['username'],
        email = data['email'],
        password = make_password(data['password'])
    )
    serializer = UserSerializerWithToken(user, many=False)
    print(serializer.data)
    return Response(serializer.data)
    # except:
    #     message = {'detail': 'User with this email already exists'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


