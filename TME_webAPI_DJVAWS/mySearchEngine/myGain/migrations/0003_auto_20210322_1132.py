# Generated by Django 3.1.7 on 2021-03-22 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myGain', '0002_auto_20210322_1117'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gain',
            name='created',
            field=models.CharField(default='', max_length=10),
        ),
    ]