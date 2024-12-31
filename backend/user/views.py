from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from user import serializers


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]

        return [IsAuthenticated()]
