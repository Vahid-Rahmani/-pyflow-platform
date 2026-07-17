from rest_framework import serializers
from .models import Plan, Subscription


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'name', 'slug', 'description', 'price_monthly', 'price_yearly', 'features']


class SubscriptionSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True)
    plan_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Subscription
        fields = ['id', 'plan', 'plan_id', 'status', 'started_at', 'expires_at']
        read_only_fields = ['id', 'plan', 'status', 'started_at', 'expires_at']
