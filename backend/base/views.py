from rest_framework.views import APIView
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

from django.contrib.auth import authenticate



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




@api_view(['POST'])
def user_register(request):
    data = request.data
    try:
        print(data['username'],data['email'])
        user = User.objects.create(
            # first_name = data['name'],
            username = data['username'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializer(user, many=False)
        print(serializer.data)
        return Response(serializer.data)
    except:
        message = {'detail': 'username taken'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class user_login(APIView):
    
    def post(self,request):
        data = request.data
        username = data['email']
        password = data['password']

        user = authenticate(username=username,password=password)
        print(username,password,user)
        serial = UserSerializer(user, many=False)
        if user is not None:
            return Response({"data":serial.data})
        else:
            return Response('Invalid credentials')

@api_view(['POST'])
def profile(request,id):
    user = User.objects.get(id=id)
    print('profile = ',user)
    serializer = UserSerializer(user, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def addImage(request,id):
    data = request.data
    user = User.objects.get(id=id)
    user.image = data['image']
    user.save()
    serializer = UserSerializer(user, many = False)
    return Response(serializer.data)


class admin_login(APIView):
    
    def post(self,request):
        data = request.data
        username = data['email']
        password = data['password']

        user = authenticate(username=username,password=password)
        print(username,password,user)
        serial = UserSerializer(user, many=False)
        if user is not None and user.is_superuser:
            return Response({"data":serial.data})
        else:
            return Response('Invalid credentials')

@api_view(['GET'])
def getUsers(request):
    user = User.objects.all().filter(is_superuser = False)
    print(user)
    print('profile = ',user)
    serializer = UserSerializer(user, many = True)
    return Response(serializer.data)

@api_view(['DELETE'])
def userDelete(request,id):
    user = User.objects.get(id=id)
    user.delete()
    return Response('User was deleted')



            


