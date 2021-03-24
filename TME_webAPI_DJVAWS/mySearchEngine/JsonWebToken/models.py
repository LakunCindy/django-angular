from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(default='',max_length=20)
    password = models.CharField(default='',max_length=20)

    class Meta:
        ordering = ('username','password',)