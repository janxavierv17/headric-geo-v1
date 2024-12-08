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
