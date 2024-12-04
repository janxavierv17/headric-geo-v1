from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from core.models import Address
from address.serializers import AddressSerializer

ADDRESS_URL = reverse("address:address-list")


def create_address(**params):
    defaults = {
        "title": "Jolibee",
        "description": "A fastfood restaurant",
        "longitude": 10.12,
        "latitude": 10.12,
    }
    defaults.update(params)
    address = Address.objects.create(**defaults)
    return address


class AddressApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_create_address(self):
        payload = {
            "title": "Jolibee",
            "description": "A fastfood restaurant",
            "longitude": 10.12,
            "latitude": 10.12,
        }

        res = self.client.post(ADDRESS_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        address = Address.objects.get(id=res.data["id"])
        for k, v in payload.items():
            self.assertEqual(getattr(address, k), v)

    def test_retrieve_addresses(self):
        create_address()
        create_address()

        res = self.client.get(ADDRESS_URL)
        addresses = Address.objects.all().order_by("-id")
        serializer = AddressSerializer(addresses, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(
            sorted(res.data, key=lambda x: x["id"]),
            sorted(serializer.data, key=lambda x: x["id"]),
        )
