from rest_framework.serializers import ModelSerializer
from myCost.models import Cost

class CostSerializer(ModelSerializer):

    class Meta:
        model = Cost
        fields = ('created','id','tigId','quantity','totalPrice')