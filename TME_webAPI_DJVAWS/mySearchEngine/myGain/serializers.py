from rest_framework.serializers import ModelSerializer
from myGain.models import Gain

class GainSerializer(ModelSerializer):

    class Meta:
        model = Gain
        fields = ('created','id','tigId','quantity','totalPrice','isSale','category')