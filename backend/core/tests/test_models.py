from django.test import TestCase
from core import models


class ModelTests(TestCase):
    def test_create_address(self):
        address = models.Address.objects.create(
            name="Jolibee",
            description="A fastfood restaurant",
            longitude=10.12,
            latitude=10.12,
            geometry={"type": "Point", "coordinates": [10.12, 10.12]},
        )

        self.assertEqual(str(address), address.title)
