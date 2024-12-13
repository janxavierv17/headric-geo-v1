from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.utils.translation import gettext_lazy as _

# Create your models here.
# 150.9283, -33.8940


class Address(models.Model):
    name = models.CharField(_("Place Name"), max_length=255, default="")
    description = models.TextField(_("Description"))
    longitude = models.FloatField(_("Longitude"))
    latitude = models.FloatField(_("Latitude"))
    geom = models.PointField(srid=4326, null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.longitude is not None and self.latitude is not None:
            self.geom = Point(self.longitude, self.latitude)
        super().save(*args, **kwargs)


class Customer(models.Model):
    first_name = models.CharField(_("First Name"), max_length=255)
    last_name = models.CharField(_("Last Name"), max_length=255)
    email = models.EmailField(_("Email"), unique=True)
    phone = models.CharField(_("Phone"), max_length=20, blank=True)
    address = models.ForeignKey(
        Address,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="customers",
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Unit(models.Model):
    unit_number = models.CharField(_("Unit Number"), max_length=50)
    address = models.ForeignKey(
        Address, on_delete=models.CASCADE, related_name="units"
    )
    is_available = models.BooleanField(_("Is Available"), default=True)
    description = models.TextField(_("Description"), blank=True)

    # New fields
    cost_per_month = models.DecimalField(
        _("Cost Per Month"), max_digits=10, decimal_places=2
    )
    number_of_bedrooms = models.IntegerField(
        _("Number of Bedrooms"), default=1
    )
    number_of_bathrooms = models.IntegerField(
        _("Number of Bathrooms"), default=1
    )
    square_footage = models.DecimalField(
        _("Square Footage"),
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )
    has_parking = models.BooleanField(_("Has Parking"), default=False)
    pet_friendly = models.BooleanField(_("Pet Friendly"), default=False)
    listed_on = models.DateField(_("Listed On"), auto_now_add=True)

    def __str__(self):
        return f"Unit {self.unit_number} - {self.address.name}"


class RentalApplication(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="applications"
    )
    unit = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name="applications"
    )
    status = models.CharField(
        _("Status"), max_length=20, choices=STATUS_CHOICES, default="pending"
    )
    applied_on = models.DateTimeField(_("Applied On"), auto_now_add=True)
    notes = models.TextField(_("Notes"), blank=True)

    def __str__(self):
        return f"Application for {self.unit} by {self.customer}"


class MaintenanceTask(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    ]

    unit = models.ForeignKey(
        Unit, on_delete=models.CASCADE, related_name="maintenance_tasks"
    )
    description = models.TextField(_("Description"))
    reported_by = models.ForeignKey(
        Customer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reported_maintenance",
    )
    status = models.CharField(
        _("Status"), max_length=20, choices=STATUS_CHOICES, default="pending"
    )
    reported_on = models.DateTimeField(_("Reported On"), auto_now_add=True)
    resolved_on = models.DateTimeField(_("Resolved On"), null=True, blank=True)

    def __str__(self):
        return f"Task for {self.unit} - {self.description[:30]}"
