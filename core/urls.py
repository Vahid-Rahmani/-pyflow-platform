from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/sandbox/', include('sandbox.urls')),
    path('api/subscriptions/', include('subscriptions.urls')),
    path('api/deepdive/', include('deepdive.urls')),
    path('accounts/', include('allauth.urls')),
    re_path(r'^.*$', views.index, name='index'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
