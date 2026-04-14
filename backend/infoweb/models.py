from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import email_validator
import uuid
import os
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        validators=[email_validator],
    )

    DESIGNATION_CHOICES = [
        ('staff', 'Staff'),
        ('manager', 'Manager'),
        ('director', 'Director'),
    ]

    designation = models.CharField(max_length=20, choices=DESIGNATION_CHOICES, default='staff')
    is_staff_member = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
class Business(models.Model):
    BUSINESS_TYPES = [
        ('produce', 'Fresh Produce'),
        ('ecommerce', 'E-Commerce'),
        ('services', 'Business Services'),
        ('apparel', 'Fashion & Apparel'),
    ]
    type = models.CharField(max_length=20, choices=BUSINESS_TYPES)
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=150)
    description = models.TextField()
    features = models.JSONField(default=list)  # store list of features
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.title

class Contact(models.Model):
    INTEREST_CHOICES = [
        ('produce', 'Fresh Produce & Wholesale'),
        ('ecommerce', 'E-Commerce Partnership'),
        ('services', 'Business Services'),
        ('apparel', 'Fashion & Apparel'),
        ('other', 'Other Inquiry'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    company = models.CharField(max_length=100, blank=True)
    interest = models.CharField(max_length=20, choices=INTEREST_CHOICES, default='other')
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.interest}"
    
class testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    content = models.TextField()
    image_url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.company}"

def collection_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    name = uuid.uuid4().hex
    return f"collections/{name}.{ext}"

class Collection(models.Model):
    INTEREST_CHOICES = [
        ('produce', 'Fresh Produce & Wholesale'),
        ('ecommerce', 'E-Commerce Partnership'),
        ('services', 'Business Services'),
        ('apparel', 'Fashion & Apparel'),
        ('other', 'Other Inquiry'),
    ]
    business = models.CharField(max_length=20, choices=INTEREST_CHOICES)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to=collection_upload_path, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.business.title()})"