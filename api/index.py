import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()

# Run migrations on cold start
try:
    from django.core.management import call_command
    call_command('migrate', '--noinput', '--run-syncdb')
except Exception:
    pass

# Vercel Python Runtime expects a variable named 'handler'
handler = app
