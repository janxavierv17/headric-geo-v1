from rest_framework import viewsets
from core.models import Unit
from unit import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class UnitViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = serializers.UnitSerializer
    queryset = Unit.objects.all()
