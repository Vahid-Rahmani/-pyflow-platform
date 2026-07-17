from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Badge, UserBadge

User = get_user_model()


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'slug', 'description', 'icon', 'category', 'xp_bonus']


class UserBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer(read_only=True)

    class Meta:
        model = UserBadge
        fields = ['id', 'badge', 'earned_at']


class UserSerializer(serializers.ModelSerializer):
    badges = UserBadgeSerializer(many=True, read_only=True, source='badges.all')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'preferred_language', 'programming_level', 'goal', 'onboarding_complete', 'xp', 'level', 'streak_count', 'badges', 'date_joined']
        read_only_fields = ['id', 'xp', 'level', 'streak_count', 'badges', 'date_joined', 'onboarding_complete']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'preferred_language']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class OnboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['programming_level', 'goal']

    def validate_programming_level(self, value):
        if value not in dict(User.PROGRAMMING_LEVELS):
            raise serializers.ValidationError('Invalid programming level')
        return value

    def validate_goal(self, value):
        if value not in dict(User.GOAL_CHOICES):
            raise serializers.ValidationError('Invalid goal')
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
