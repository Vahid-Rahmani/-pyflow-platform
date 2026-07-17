from django.core.management.base import BaseCommand
from subscriptions.models import Plan


PLANS = [
    {
        'name': 'Free',
        'slug': 'free',
        'description': 'Get started with Python basics',
        'price_monthly': 0,
        'price_yearly': 0,
        'features': [
            'Beginner courses',
            'Limited exercises (5/day)',
            'Limited AI help (10 chats/day)',
            'Basic code execution',
        ],
        'order': 0,
    },
    {
        'name': 'Premium Monthly',
        'slug': 'premium-monthly',
        'description': 'Unlock the full learning experience',
        'price_monthly': 3.99,
        'price_yearly': 39.99,
        'features': [
            'All courses & advanced content',
            'Unlimited exercises',
            'Unlimited AI tutor chats',
            'Unlimited code execution',
            'Project-based learning',
            'Certificates',
            'Priority support',
        ],
        'order': 1,
    },
]


class Command(BaseCommand):
    help = 'Seed subscription plans'

    def handle(self, *args, **options):
        for plan_data in PLANS:
            Plan.objects.update_or_create(
                slug=plan_data['slug'],
                defaults=plan_data,
            )
            self.stdout.write(self.style.SUCCESS(f"Plan '{plan_data['name']}' ready"))
