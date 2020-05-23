from django.shortcuts import render

from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserSerializer, LocationSerializer
from .models import Location


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class LocationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

