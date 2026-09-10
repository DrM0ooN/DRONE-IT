from django.contrib.auth.models import User
from rest_framework import serializers

from .models import AccountProfile


def build_user_payload(user):
    profile = getattr(user, 'profile', None)
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'user_type': profile.user_type if profile else 'customer',
        'phone_number': profile.phone_number if profile else '',
        'address': profile.address if profile else '',
        'city': profile.city if profile else '',
        'postal_code': profile.postal_code if profile else '',
        'company_name': profile.company_name if profile else '',
        'business_registration_number': profile.business_registration_number if profile else '',
        'tax_id': profile.tax_id if profile else '',
        'created_at': profile.created_at.isoformat() if profile else user.date_joined.isoformat(),
    }


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    user_type = serializers.ChoiceField(choices=AccountProfile.USER_TYPES)
    phone_number = serializers.CharField(max_length=30, required=False, allow_blank=True)
    address = serializers.CharField(max_length=255, required=False, allow_blank=True)
    city = serializers.CharField(max_length=120, required=False, allow_blank=True)
    postal_code = serializers.CharField(max_length=20, required=False, allow_blank=True)
    company_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    business_registration_number = serializers.CharField(max_length=120, required=False, allow_blank=True)
    tax_id = serializers.CharField(max_length=120, required=False, allow_blank=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('A user with that username already exists.')
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with that email already exists.')
        return value

    def create(self, validated_data):
        profile_data = {
            'user_type': validated_data.pop('user_type'),
            'phone_number': validated_data.pop('phone_number', ''),
            'address': validated_data.pop('address', ''),
            'city': validated_data.pop('city', ''),
            'postal_code': validated_data.pop('postal_code', ''),
            'company_name': validated_data.pop('company_name', ''),
            'business_registration_number': validated_data.pop('business_registration_number', ''),
            'tax_id': validated_data.pop('tax_id', ''),
        }

        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()

        AccountProfile.objects.create(user=user, **profile_data)
        return user