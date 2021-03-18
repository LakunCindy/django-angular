from rest_framework.serializers import ModelSerializer
from myGain.models import Gain

class GainSerializer(ModelSerializer):

    class Meta:
        model = Gain
        fields = ('id','tigId','quantity','totalPrice','isSale')