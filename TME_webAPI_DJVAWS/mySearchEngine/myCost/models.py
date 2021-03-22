from django.db import models

# Create your models here.
class Cost(models.Model):
    created = models.CharField(default='',max_length=10)
    tigId = models.IntegerField(default='-1')
    quantity = models.IntegerField(default='0')
    totalPrice = models.IntegerField(default='0')

    class Meta:
        ordering = ('created','tigId','quantity','totalPrice',)
