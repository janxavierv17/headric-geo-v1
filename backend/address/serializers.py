from rest_framework_gis.serializers import GeoFeatureModelSerializer
from core.models import Address


class AddressSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Address
        geo_field = "geom"
        fields = "__all__"
        read_only_fields = ["id"]

    def create(self, validated_data):
        address = Address.objects.create(**validated_data)
        return address
