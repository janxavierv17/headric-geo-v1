from django.test import TestCase
from core import models


class ModelTests(TestCase):
    def test_create_address(self):
        address = models.Address.objects.create(
            title="Jolibee",
            description="A fastfood restaurant",
            longitude=10.12,
            latitude=10.12,
        )

        self.assertEqual(str(address), address.title)
