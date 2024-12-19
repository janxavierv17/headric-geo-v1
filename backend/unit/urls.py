from django.urls import path, include
from rest_framework.routers import DefaultRouter
from unit import views

router = DefaultRouter()
router.register(
    prefix="api/v1/unit", viewset=views.UnitViewSet, basename="unit"
)
app_name = "unit"
urlpatterns = [path("", include(router.urls))]
