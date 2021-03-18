from django.db import models

# Create your models here.
class Gain(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    tigId = models.IntegerField(default='-1')
    quantity = models.IntegerField(default='0')
    totalPrice = models.IntegerField(default='0')
    isSale = models.BooleanField(default=False)

    class Meta:
        ordering = ('tigId','quantity','totalPrice','isSale',)