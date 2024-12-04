from django.db import models

# Create your models here.


class Address(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return self.title
