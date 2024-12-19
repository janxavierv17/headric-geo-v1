from rest_framework_gis.serializers import GeoFeatureModelSerializer
from core.models import Unit
from address.serializers import AddressSerializer


class UnitSerializer(GeoFeatureModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Unit
        geo_field = None
        fields = "__all__"
        read_only_fields = ["id"]

    def create(self, validated_data):
        address_searializer = AddressSerializer(
            data=validated_data.pop("address")
        )
        address_searializer.is_valid(raise_exception=True)
        address = address_searializer.save()

        unit = Unit.objects.create(address=address, **validated_data)
        return unit
