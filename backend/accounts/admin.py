from django.contrib import admin

from .models import AccountProfile


@admin.register(AccountProfile)
class AccountProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'user_type', 'company_name', 'created_at')
    search_fields = ('user__username', 'user__email', 'company_name')
    list_filter = ('user_type',)