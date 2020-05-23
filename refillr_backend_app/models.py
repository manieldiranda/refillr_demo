from django.db import models

# Create your models here.


class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    name = models.CharField(blank=True, max_length=30, null=True)
    address = models.CharField(blank=True, max_length=450)
    image = models.ImageField(upload_to='location_images/', null=True, blank=True)
    description = models.TextField(blank=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)


    def __str__(self):
        return self.name
