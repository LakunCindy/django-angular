from rest_framework.serializers import ModelSerializer
from myImageBank.models import MyImageURL

class MyImageURLSerializer(ModelSerializer):
  class Meta:
    model = MyImageURL
    fields = ('id', 'myUrl')
