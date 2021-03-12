from rest_framework.views import APIView
from rest_framework.response import Response
from myImageBank.models import MyImageURL
from myImageBank.serializers import MyImageURLSerializer
from django.http import Http404
import secrets

# Create your views here.

class RandomImage(APIView):
    def get_object(self):
        try:
            pks =  MyImageURL.objects.values_list('pk', flat=True)
            return MyImageURL.objects.get(pk=secrets.choice(pks))
        except:
            raise Http404
    def get(self, request, format=None):
        myUrl = self.get_object()
        serializer = MyImageURLSerializer(myUrl)
        return Response(serializer.data)

class Image(APIView):
    def get_object(self, image_id):
        try:
            return MyImageURL.objects.get(pk=image_id)
        except MyImageURL.DoesNotExist:
            raise Http404

    def get(self, request, image_id, format=None):
        myUrl = self.get_object(image_id)
        serializer = MyImageURLSerializer(myUrl)
        return Response(serializer.data)
