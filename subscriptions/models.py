from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Plan(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    price_monthly = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    price_yearly = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    features = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Subscription(models.Model):
    STATUS_CHOICES = [
        ('active', _('Active')),
        ('canceled', _('Canceled')),
        ('expired', _('Expired')),
        ('trialing', _('Trialing')),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscription')
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='trialing')
    started_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    canceled_at = models.DateTimeField(null=True, blank=True)
    stripe_subscription_id = models.CharField(max_length=255, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'{self.user.username} - {self.plan}'
