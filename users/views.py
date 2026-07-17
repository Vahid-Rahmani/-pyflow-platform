from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, login as django_login
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserSerializer, RegisterSerializer, ChangePasswordSerializer,
    BadgeSerializer, OnboardingSerializer,
)
from .models import Badge
from .onboarding import generate_roadmap, get_available_roadmaps

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'detail': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'detail': 'Password changed successfully'})


class LeaderboardView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return User.objects.order_by('-xp', 'level')[:100]


class BadgeListView(generics.ListAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.AllowAny]


class OnboardingView(APIView):
    def post(self, request):
        serializer = OnboardingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        user.programming_level = serializer.validated_data['programming_level']
        user.goal = serializer.validated_data['goal']
        user.onboarding_complete = True
        user.save(update_fields=['programming_level', 'goal', 'onboarding_complete'])
        roadmap = generate_roadmap(user)
        return Response({
            'onboarding_complete': True,
            'programming_level': user.programming_level,
            'goal': user.goal,
            'roadmap': roadmap,
        })

    def get(self, request):
        user = request.user
        if user.onboarding_complete:
            roadmap = generate_roadmap(user)
            return Response({
                'onboarding_complete': True,
                'programming_level': user.programming_level,
                'goal': user.goal,
                'roadmap': roadmap,
            })
        return Response({
            'onboarding_complete': False,
            'levels': dict(User.PROGRAMMING_LEVELS),
            'goals': dict(User.GOAL_CHOICES),
        })


class RoadmapListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        roadmaps = get_available_roadmaps()
        return Response(roadmaps)


class MyRoadmapView(APIView):
    def get(self, request):
        user = request.user
        if not user.onboarding_complete:
            return Response({'error': 'Complete onboarding first'}, status=400)
        roadmap = generate_roadmap(user)
        completed_milestones = user.milestone_progress.filter(completed=True).values_list('milestone__title', flat=True)
        milestones = []
        for m in roadmap['milestones']:
            milestones.append({
                **m,
                'completed': m['title'] in completed_milestones,
            })
        return Response({
            'title': roadmap['title'],
            'description': roadmap['description'],
            'milestones': milestones,
            'progress': sum(1 for m in milestones if m['completed']),
            'total': len(milestones),
        })


class SessionTokenView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        refresh = RefreshToken.for_user(request.user)
        return Response({
            'user': UserSerializer(request.user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })
