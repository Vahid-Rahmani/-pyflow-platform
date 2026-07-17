from django.urls import path
from . import views

urlpatterns = [
    path('execute/', views.ExecuteCodeView.as_view(), name='sandbox-execute'),
    path('review/', views.CodeReviewView.as_view(), name='sandbox-review'),
    path('hint/', views.HintView.as_view(), name='sandbox-hint'),
    path('explain-error/', views.ExplainErrorView.as_view(), name='sandbox-explain-error'),
    path('tutor/', views.TutorChatView.as_view(), name='sandbox-tutor'),
    path('health/', views.HealthView.as_view(), name='sandbox-health'),
]
