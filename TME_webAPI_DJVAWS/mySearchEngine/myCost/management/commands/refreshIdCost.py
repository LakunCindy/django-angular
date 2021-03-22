from django.core.management.base import BaseCommand, CommandError
from myCost.models import Cost
from myCost.serializers import CostSerializer
from myCost.config import baseUrl
import requests
import time

class Command(BaseCommand):
    help = 'Refresh the list of products which are on sale.'

    def handle(self, *args, **options):
        self.stdout.write('['+time.ctime()+'] Refreshing data...')
        response = requests.get(baseUrl+'products/')
        jsondata = response.json()
        Cost.objects.all().delete()
        for product in jsondata:
                serializer_tigId = CostSerializer(data={'tigId':str(product['id'])})
                if serializer_tigId.is_valid():
                    serializer_tigId.save()
                    self.stdout.write(self.style.SUCCESS('['+time.ctime()+'] Successfully added product id="%s"' % product['id']))
        self.stdout.write('['+time.ctime()+'] Data refresh terminated.')
