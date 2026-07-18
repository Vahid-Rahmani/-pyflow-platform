from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'levels', views.DeepDiveLevelViewSet, basename='deepdive-level')
router.register(r'golden-keys', views.GoldenKeyViewSet, basename='golden-key')
router.register(r'certificates', views.CertificateViewSet, basename='certificate')

urlpatterns = [
    path('', include(router.urls)),
    path('levels/<int:level_number>/subsections/',
         views.DeepDiveSubSectionViewSet.as_view({'get': 'list'}),
         name='subsection-list'),
    path('levels/<int:level_number>/subsections/<int:pk>/',
         views.DeepDiveSubSectionViewSet.as_view({'get': 'retrieve'}),
         name='subsection-detail'),
    path('levels/<int:level_number>/subsections/<int:pk>/complete-exam/',
         views.DeepDiveSubSectionViewSet.as_view({'post': 'complete_exam'}),
         name='subsection-complete-exam'),
    path('levels/<int:level_number>/subsections/<int:pk>/earn-iq/',
         views.DeepDiveSubSectionViewSet.as_view({'post': 'earn_iq'}),
         name='subsection-earn-iq'),
    path('levels/<int:level_number>/subsections/<int:pk>/export-markdown/',
         views.DeepDiveSubSectionViewSet.as_view({'get': 'export_markdown'}),
         name='subsection-export-md'),
]
