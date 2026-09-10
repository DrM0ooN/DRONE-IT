from django.contrib.auth.models import User
from django.db import models


class AccountProfile(models.Model):
    CUSTOMER = 'customer'
    BUSINESS = 'business'

    USER_TYPES = [
        (CUSTOMER, 'Customer'),
        (BUSINESS, 'Business'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    phone_number = models.CharField(max_length=30, blank=True, default='')
    address = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=120, blank=True, default='')
    postal_code = models.CharField(max_length=20, blank=True, default='')
    company_name = models.CharField(max_length=255, blank=True, default='')
    business_registration_number = models.CharField(max_length=120, blank=True, default='')
    tax_id = models.CharField(max_length=120, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} ({self.user_type})'