from rest_framework import viewsets
from core.models import Unit
from unit import serializers


class UnitViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UnitSerializer
    queryset = Unit.objects.all()
