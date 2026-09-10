from django.contrib.auth.hashers import make_password
from django.db import migrations


def update_demo_account_passwords(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    AccountProfile = apps.get_model('accounts', 'AccountProfile')

    demo_accounts = [
        {
            'username': 'customer',
            'email': 'customer@demo.local',
            'password': 'customer123',
            'first_name': 'Demo',
            'last_name': 'Customer',
            'user_type': 'customer',
        },
        {
            'username': 'business',
            'email': 'business@demo.local',
            'password': 'business123',
            'first_name': 'Demo',
            'last_name': 'Business',
            'user_type': 'business',
            'company_name': 'Demo Business',
            'business_registration_number': 'DEMO-001',
            'tax_id': 'DEMO-TAX',
        },
    ]

    for account in demo_accounts:
        password = account.pop('password')
        profile_defaults = {
            'user_type': account.pop('user_type'),
            'phone_number': account.pop('phone_number', ''),
            'address': account.pop('address', ''),
            'city': account.pop('city', ''),
            'postal_code': account.pop('postal_code', ''),
            'company_name': account.pop('company_name', ''),
            'business_registration_number': account.pop('business_registration_number', ''),
            'tax_id': account.pop('tax_id', ''),
        }

        user, _ = User.objects.get_or_create(username=account['username'], defaults=account)
        for field, value in account.items():
            setattr(user, field, value)
        user.password = make_password(password)
        user.is_active = True
        user.save()

        profile, _ = AccountProfile.objects.get_or_create(user=user, defaults=profile_defaults)
        for field, value in profile_defaults.items():
            setattr(profile, field, value)
        profile.save()


def noop_reverse(apps, schema_editor):
    return None


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_seed_demo_accounts'),
    ]

    operations = [
        migrations.RunPython(update_demo_account_passwords, noop_reverse),
    ]
