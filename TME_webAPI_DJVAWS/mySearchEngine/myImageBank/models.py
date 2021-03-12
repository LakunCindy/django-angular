from django.db import models

# Create your models here.

class MyImageURL(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  myUrl = models.URLField(default='')
  class Meta:
    ordering = ('myUrl',)
