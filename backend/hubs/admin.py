from django.contrib import admin

from .models import Hub


@admin.register(Hub)
class HubAdmin(admin.ModelAdmin):
	list_display = ('name', 'latitude', 'longitude', 'icon_url')
	search_fields = ('name',)
