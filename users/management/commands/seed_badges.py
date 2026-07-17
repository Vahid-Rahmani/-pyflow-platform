from django.core.management.base import BaseCommand
from users.models import Badge


BADGES = [
    {'name': 'First Steps', 'slug': 'first-lesson', 'description': 'Complete your first lesson', 'icon': '🌱', 'category': 'milestone', 'xp_bonus': 10},
    {'name': 'Code Warrior', 'slug': 'first-challenge', 'description': 'Solve your first coding challenge', 'icon': '⚔️', 'category': 'milestone', 'xp_bonus': 20},
    {'name': 'Quiz Master', 'slug': 'first-quiz', 'description': 'Pass your first quiz', 'icon': '🧠', 'category': 'milestone', 'xp_bonus': 15},
    {'name': 'Week Warrior', 'slug': '7-day-streak', 'description': 'Maintain a 7-day learning streak', 'icon': '🔥', 'category': 'streak', 'xp_bonus': 50},
    {'name': 'Dedicated', 'slug': '30-day-streak', 'description': 'Maintain a 30-day learning streak', 'icon': '💎', 'category': 'streak', 'xp_bonus': 200},
    {'name': 'Century', 'slug': '100-xp', 'description': 'Earn 100 XP total', 'icon': '💯', 'category': 'milestone', 'xp_bonus': 30},
    {'name': 'Power User', 'slug': '1000-xp', 'description': 'Earn 1000 XP total', 'icon': '🚀', 'category': 'milestone', 'xp_bonus': 100},
    {'name': 'Scholar', 'slug': 'course-complete', 'description': 'Complete an entire course', 'icon': '🎓', 'category': 'milestone', 'xp_bonus': 100},
    {'name': 'Level 5', 'slug': 'level-5', 'description': 'Reach level 5', 'icon': '⭐', 'category': 'milestone', 'xp_bonus': 50},
    {'name': 'Level 10', 'slug': 'level-10', 'description': 'Reach level 10', 'icon': '🌟', 'category': 'milestone', 'xp_bonus': 100},
    {'name': 'Pythonista', 'slug': 'python-master', 'description': 'Complete all Python basics challenges', 'icon': '🐍', 'category': 'skill', 'xp_bonus': 150},
    {'name': 'Early Bird', 'slug': 'early-adopter', 'description': 'Join the platform in its first month', 'icon': '🕊️', 'category': 'special', 'xp_bonus': 50},
]


class Command(BaseCommand):
    help = 'Seed initial badges into the database'

    def handle(self, *args, **options):
        created_count = 0
        for badge_data in BADGES:
            _, created = Badge.objects.get_or_create(slug=badge_data['slug'], defaults=badge_data)
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created badge: {badge_data["name"]}'))
        self.stdout.write(self.style.SUCCESS(f'Done. Created {created_count} new badges.'))
