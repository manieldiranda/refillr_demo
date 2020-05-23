from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Location


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['location_id', 'name', 'description',  'latitude', 'longitude', 'image', 'address']
