from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    pass
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

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    company = models.CharField(max_length=100, blank=True)
    interest = models.CharField(max_length=20, choices=INTEREST_CHOICES, default='other')
    message = models.TextField()
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
