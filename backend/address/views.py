from rest_framework import viewsets
from core.models import Address
from address import serializers


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AddressSerializer
    queryset = Address.objects.all()
