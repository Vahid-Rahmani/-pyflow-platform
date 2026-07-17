import math
from datetime import timedelta
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


def calculate_level(xp):
    return int(math.sqrt(xp / 100)) + 1


class User(AbstractUser):
    PROGRAMMING_LEVELS = [
        ('beginner', _('Complete beginner')),
        ('basic', _('Basic programming knowledge')),
        ('intermediate', _('Intermediate developer')),
        ('advanced', _('Professional developer')),
    ]
    GOAL_CHOICES = [
        ('learn', _('Learn programming')),
        ('job', _('Get a developer job')),
        ('ai', _('Build AI tools')),
        ('automate', _('Automate tasks')),
        ('web', _('Create websites')),
        ('apps', _('Build apps')),
    ]

    preferred_language = models.CharField(
        max_length=5,
        choices=[('en', 'English'), ('de', 'German'), ('tr', 'Turkish'), ('ru', 'Russian'), ('ar', 'Arabic')],
        default='en'
    )
    programming_level = models.CharField(max_length=20, choices=PROGRAMMING_LEVELS, blank=True, null=True)
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES, blank=True, null=True)
    onboarding_complete = models.BooleanField(default=False)
    xp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    streak_count = models.IntegerField(default=0)
    last_active_date = models.DateField(null=True, blank=True)

    def add_xp(self, amount):
        self.xp += amount
        new_level = calculate_level(self.xp)
        leveled_up = new_level > self.level
        self.level = new_level
        self.update_streak()
        self.save(update_fields=['xp', 'level', 'streak_count', 'last_active_date'])
        new_badges = []
        if self.xp >= 100:
            if self.award_badge('100-xp'): new_badges.append('100-xp')
        if self.xp >= 1000:
            if self.award_badge('1000-xp'): new_badges.append('1000-xp')
        if self.level >= 5:
            if self.award_badge('level-5'): new_badges.append('level-5')
        if self.level >= 10:
            if self.award_badge('level-10'): new_badges.append('level-10')
        return {'xp_earned': amount, 'total_xp': self.xp, 'level': self.level, 'leveled_up': leveled_up, 'new_badges': new_badges}

    def update_streak(self):
        today = timezone.localdate()
        if self.last_active_date == today:
            return
        if self.last_active_date == today - timedelta(days=1):
            self.streak_count += 1
        else:
            self.streak_count = 1
        self.last_active_date = today
        if self.streak_count >= 7:
            self.award_badge('7-day-streak')
        if self.streak_count >= 30:
            self.award_badge('30-day-streak')

    def award_badge(self, badge_slug):
        badge = Badge.objects.filter(slug=badge_slug).first()
        if badge and not self.badges.filter(badge=badge).exists():
            UserBadge.objects.create(user=self, badge=badge)
            return True
        return False


class Badge(models.Model):
    CATEGORY_CHOICES = [
        ('milestone', _('Milestone')),
        ('streak', _('Streak')),
        ('skill', _('Skill')),
        ('special', _('Special')),
    ]

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField()
    icon = models.CharField(max_length=10, default='🏆')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='milestone')
    xp_bonus = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'badge']

    def __str__(self):
        return f'{self.user.username} - {self.badge.name}'
