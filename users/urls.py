from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='auth-register'),
    path('login/', TokenObtainPairView.as_view(), name='auth-login'),
    path('refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('me/', views.MeView.as_view(), name='auth-me'),
    path('change-password/', views.ChangePasswordView.as_view(), name='auth-change-password'),
    path('leaderboard/', views.LeaderboardView.as_view(), name='auth-leaderboard'),
    path('badges/', views.BadgeListView.as_view(), name='auth-badges'),
    path('onboarding/', views.OnboardingView.as_view(), name='auth-onboarding'),
    path('roadmaps/', views.RoadmapListView.as_view(), name='auth-roadmaps'),
    path('my-roadmap/', views.MyRoadmapView.as_view(), name='auth-my-roadmap'),
]
