from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import BusinessViewSet,ContactViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'businesses', BusinessViewSet)
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
     path("", views.index, name="index"),
     path("/api", include(router.urls)),
]