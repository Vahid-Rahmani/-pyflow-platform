import os
import sys
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = get_wsgi_application()

# Vercel Python Runtime expects a variable named 'handler'
handler = app
