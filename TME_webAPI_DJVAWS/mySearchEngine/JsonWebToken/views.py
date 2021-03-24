from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from JsonWebToken.models import User as UserTest


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class User(APIView):
        def get(self, request):
            user = {'username':'louis','password':'abcd1234'}
            try:
                userverif = UserTest.objects.filter(username=user["username"],password=user["password"]).get()
            except:
                return Response(type(User))
            if(userverif):
                refresh = RefreshToken.for_user(userverif)
                
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            