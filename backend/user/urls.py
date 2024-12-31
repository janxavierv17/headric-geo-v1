from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user import views

router = DefaultRouter()
router.register(
    prefix="api/v1/user", viewset=views.UserViewSet, basename="user"
)
app_name = "user"
urlpatterns = [path("", include(router.urls))]
