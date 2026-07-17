from django.contrib import admin
from .models import Plan, Subscription


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ['name', 'price_monthly', 'price_yearly', 'is_active', 'order']


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'plan', 'status', 'started_at', 'expires_at']
    list_filter = ['status', 'plan']
