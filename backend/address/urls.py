from django.urls import path, include
from rest_framework.routers import DefaultRouter
from address import views

router = DefaultRouter()
router.register(
    prefix="api/v1/address", viewset=views.AddressViewSet, basename="address"
)
app_name = "address"
urlpatterns = [path("", include(router.urls))]
