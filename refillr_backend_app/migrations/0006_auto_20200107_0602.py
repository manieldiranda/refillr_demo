# Generated by Django 2.0.5 on 2020-01-07 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('refillr_backend_app', '0005_location_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='location_images/'),
        ),
    ]
