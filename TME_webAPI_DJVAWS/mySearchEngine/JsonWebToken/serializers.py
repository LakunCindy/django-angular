from rest_framework.serializers import ModelSerializer
from JsonWebToken.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
