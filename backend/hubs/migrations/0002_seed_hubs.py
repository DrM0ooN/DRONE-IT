from django.db import migrations


def seed_hubs(apps, schema_editor):
    Hub = apps.get_model('hubs', 'Hub')

    hubs = [
        {
            'id': 1,
            'name': 'Downtown Hub',
            'latitude': 50.0875,
            'longitude': 14.4213,
            'icon_url': '/images/drone_hub_icon.png',
        },
        {
            'id': 2,
            'name': 'Riverside Hub',
            'latitude': 50.0725,
            'longitude': 14.4559,
            'icon_url': '/images/drone_hub_icon.png',
        },
        {
            'id': 3,
            'name': 'Airport Hub',
            'latitude': 50.1062,
            'longitude': 14.2668,
            'icon_url': '/images/drone_hub_icon.png',
        },
    ]

    for hub_data in hubs:
        Hub.objects.update_or_create(id=hub_data['id'], defaults=hub_data)


def unseed_hubs(apps, schema_editor):
    Hub = apps.get_model('hubs', 'Hub')
    Hub.objects.filter(id__in=[1, 2, 3]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_hubs, unseed_hubs),
    ]