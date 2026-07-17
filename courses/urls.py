from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.CourseViewSet, basename='course')

urlpatterns = [
    path('', include(router.urls)),
    path('projects/', views.ProjectViewSet.as_view({'get': 'list', 'post': 'create'}), name='project-list'),
    path('projects/<int:pk>/', views.ProjectViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='project-detail'),
    path('progress/', views.ProgressViewSet.as_view({'get': 'list'}), name='progress-list'),
    path('progress/<slug:pk>/', views.ProgressViewSet.as_view({'get': 'retrieve'}), name='progress-detail'),
    path('<slug:course_slug>/modules/', views.ModuleViewSet.as_view({'get': 'list'}), name='module-list'),
    path('<slug:course_slug>/modules/<slug:slug>/', views.ModuleViewSet.as_view({'get': 'retrieve'}), name='module-detail'),
    path('<slug:course_slug>/lessons/', views.LessonViewSet.as_view({'get': 'list'}), name='lesson-list'),
    path('<slug:course_slug>/lessons/<slug:slug>/', views.LessonViewSet.as_view({'get': 'retrieve', 'post': 'complete'}), name='lesson-detail'),
    path('<slug:course_slug>/lessons/<slug:slug>/complete/', views.LessonViewSet.as_view({'post': 'complete'}), name='lesson-complete'),
    path('<slug:course_slug>/challenges/', views.CodeChallengeViewSet.as_view({'get': 'list'}), name='challenge-list'),
    path('<slug:course_slug>/challenges/<slug:slug>/', views.CodeChallengeViewSet.as_view({'get': 'retrieve'}), name='challenge-detail'),
    path('<slug:course_slug>/challenges/<slug:slug>/submit/', views.CodeChallengeViewSet.as_view({'post': 'submit'}), name='challenge-submit'),
    path('<slug:course_slug>/quizzes/', views.QuizViewSet.as_view({'get': 'list'}), name='quiz-list'),
    path('<slug:course_slug>/quizzes/<slug:slug>/', views.QuizViewSet.as_view({'get': 'retrieve'}), name='quiz-detail'),
    path('<slug:course_slug>/quizzes/<slug:slug>/submit/', views.QuizViewSet.as_view({'post': 'submit'}), name='quiz-submit'),
]
