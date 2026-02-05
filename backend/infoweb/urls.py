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
     path("api/", include(router.urls)),
     path('staff/register/', views.staff_register, name='staff-register'),
     path('staff/login/', views.staff_login, name='staff-login'),
     path('staff/logout/', views.logout_view, name='staff-logout'),
     path('staff/pending/', views.pending_staff_list, name='pending-staff-list'),
     path('approve-staff/<int:pk>/', views.approve_staff_user, name='approve-staff'),
     path('list-contacts/', views.list_contacts, name='list-contacts'),
     path('contacts/<int:pk>/status/', views.update_contact_status, name='update-contact-status'),
     path('collections/add/', views.create_collection, name='create-collection'),
     path('api/collections/<str:business_id>/', views.collections_by_business, name='collections-by-business'),
]