from django.contrib import admin
from django.contrib.gis.geos import Point
from core import models


class AddressAdmin(admin.ModelAdmin):
    exclude = ("geom",)

    def save_model(self, request, obj, form, change):
        if obj.longitude is not None and obj.latitude is not None:
            obj.geom = Point(obj.longitude, obj.latitude)

        super().save_model(request, obj, form, change)


admin.site.register(models.Address, AddressAdmin)
admin.site.register(models.Customer)
admin.site.register(models.Unit)
admin.site.register(models.RentalApplication)
admin.site.register(models.MaintenanceTask)
