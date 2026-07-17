from django.urls import path
from . import views

urlpatterns = [
    path('plans/', views.PlanViewSet.as_view({'get': 'list'}), name='plan-list'),
    path('plans/<slug:slug>/', views.PlanViewSet.as_view({'get': 'retrieve'}), name='plan-detail'),
    path('my/', views.SubscriptionViewSet.as_view({'get': 'retrieve'}), name='subscription-detail'),
    path('subscribe/', views.SubscriptionViewSet.as_view({'post': 'subscribe'}), name='subscription-subscribe'),
    path('cancel/', views.SubscriptionViewSet.as_view({'post': 'cancel'}), name='subscription-cancel'),
]
