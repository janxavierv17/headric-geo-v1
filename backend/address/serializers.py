from rest_framework import serializers
from core.models import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "title", "description", "longitude", "latitude"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        address = Address.objects.create(**validated_data)
        return address
