import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()

# Run migrations and seed data on cold start
try:
    from django.core.management import call_command
    call_command('migrate', '--noinput', '--run-syncdb')
    from django.contrib.sites.models import Site
    domain = os.environ.get('SITE_DOMAIN', 'learnapp.vercel.app')
    Site.objects.update_or_create(id=1, defaults={'domain': domain, 'name': 'LearnApp'})
except Exception:
    pass

# Vercel Python Runtime expects a variable named 'handler'
handler = app
