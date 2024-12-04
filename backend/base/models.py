from django.contrib.auth.models import AbstractUser
from django.contrib.gis.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from django.contrib.postgres.operations import CreateExtension
from django.db import migrations


class Migration(migrations.Migration):
    operations = [
        CreateExtension("postgis"),
    ]


class User(AbstractUser):
    """
    Extended User model with additional fields
    Extends Django's built-in AbstractUser
    """

    phone_number = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=50, blank=True, null=True)
    profile_image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.username


class PropertyType(models.Model):
    """
    Taxonomy of property types
    """

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Property(models.Model):
    """
    Comprehensive property model with geospatial support
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="properties")
    type = models.ForeignKey(
        PropertyType, on_delete=models.SET_NULL, null=True, related_name="properties"
    )

    # Identification and Location
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)

    # Geographical Information
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)

    # Geospatial Column
    location = models.PointField(srid=4326, null=True, blank=True)

    # Property Specifications
    land_area = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )
    built_area = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )
    year_built = models.IntegerField(null=True, blank=True)

    # Financial Details
    purchase_price = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )
    current_market_value = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )

    # Status Tracking
    is_active = models.BooleanField(default=True)
    is_for_sale = models.BooleanField(default=False)
    is_for_rent = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class PropertyImage(models.Model):
    """
    Images associated with a property
    """

    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="images"
    )
    image_url = models.URLField()
    alt_text = models.CharField(max_length=200, blank=True, null=True)
    is_primary = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Image for {self.property.title}"


class RentalListing(models.Model):
    """
    Rental listings for properties
    """

    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="rental_listings"
    )
    monthly_rent = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0)]
    )
    security_deposit = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )

    # Availability and Listing Management
    available_from = models.DateField(null=True, blank=True)
    available_to = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    # Listing Details
    min_lease_duration = models.IntegerField(null=True, blank=True)  # in months
    max_lease_duration = models.IntegerField(null=True, blank=True)  # in months

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Rental Listing for {self.property.title}"


class LeaseAgreement(models.Model):
    """
    Lease agreements for properties
    """

    LEASE_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("active", "Active"),
        ("expired", "Expired"),
        ("terminated", "Terminated"),
    ]

    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="lease_agreements"
    )
    tenant = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="lease_agreements"
    )

    lease_start_date = models.DateField()
    lease_end_date = models.DateField()

    # Financial Terms
    monthly_rent = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0)]
    )
    security_deposit = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )

    # Status Tracking
    status = models.CharField(
        max_length=20, choices=LEASE_STATUS_CHOICES, default="pending"
    )

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Lease Agreement for {self.property.title}"


class MaintenanceRequest(models.Model):
    """
    Maintenance requests for properties
    """

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
    ]

    STATUS_CHOICES = [
        ("reported", "Reported"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]

    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="maintenance_requests"
    )
    requester = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="maintenance_requests_made"
    )
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="maintenance_requests_assigned",
    )

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    # Request Management
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default="low")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="reported")

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Maintenance Request: {self.title}"
