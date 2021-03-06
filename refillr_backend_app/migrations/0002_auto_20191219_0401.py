# Generated by Django 2.0.5 on 2019-12-19 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('refillr_backend_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='name',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
