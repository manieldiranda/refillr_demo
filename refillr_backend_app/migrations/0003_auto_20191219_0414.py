# Generated by Django 2.0.5 on 2019-12-19 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('refillr_backend_app', '0002_auto_20191219_0401'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='id',
        ),
        migrations.AddField(
            model_name='location',
            name='location_id',
            field=models.IntegerField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
