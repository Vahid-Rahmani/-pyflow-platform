from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Course, Module, Lesson, CodeChallenge, Quiz, Question, Answer, UserProgress, Project
from .serializers import (
    CourseListSerializer, CourseDetailSerializer, ModuleSerializer,
    LessonSerializer, CodeChallengeSerializer, QuizSerializer,
    CodeSubmitSerializer, QuizSubmitSerializer, ProjectSerializer,
)


def complete_content(user, content_type, content_obj):
    progress, created = UserProgress.objects.get_or_create(
        user=user,
        content_type=content_type,
        content_id=content_obj.id,
        defaults={'completed': True, 'completed_at': timezone.now()}
    )
    if created:
        return user.add_xp(content_obj.xp_reward)
    return {'xp_earned': 0, 'total_xp': user.xp, 'level': user.level, 'leveled_up': False}


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_published=True)
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseDetailSerializer


class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ModuleSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        course = get_object_or_404(Course, slug=self.kwargs['course_slug'])
        return Module.objects.filter(course=course)


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LessonSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Lesson.objects.filter(module__course__slug=self.kwargs['course_slug'])

    def get_permissions(self):
        if self.action == 'complete':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=['post'])
    def complete(self, request, course_slug=None, slug=None):
        lesson = self.get_object()
        result = complete_content(request.user, 'lesson', lesson)
        return Response(result)


class CodeChallengeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CodeChallengeSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return CodeChallenge.objects.filter(module__course__slug=self.kwargs['course_slug'])

    def get_permissions(self):
        if self.action == 'submit':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=['post'])
    def submit(self, request, course_slug=None, slug=None):
        challenge = self.get_object()
        serializer = CodeSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = complete_content(request.user, 'challenge', challenge)
        result['success'] = True
        return Response(result)


class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = QuizSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Quiz.objects.filter(module__course__slug=self.kwargs['course_slug'])

    def get_permissions(self):
        if self.action == 'submit':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=['post'])
    def submit(self, request, course_slug=None, slug=None):
        quiz = self.get_object()
        serializer = QuizSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        correct_count = 0
        total_questions = quiz.questions.count()
        for item in serializer.validated_data['answers']:
            question = get_object_or_404(Question, id=item['question_id'], quiz=quiz)
            correct_answer = question.answers.filter(is_correct=True).first()
            if correct_answer and str(correct_answer.id) == str(item.get('answer_id')):
                correct_count += 1
        passed = correct_count >= total_questions * 0.7
        result = {'passed': passed, 'correct': correct_count, 'total': total_questions}
        if passed:
            xp_result = complete_content(request.user, 'quiz', quiz)
            result.update(xp_result)
        else:
            result.update({'xp_earned': 0, 'total_xp': request.user.xp, 'level': request.user.level, 'leveled_up': False})
        return Response(result)


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProgressViewSet(viewsets.ViewSet):
    def list(self, request):
        user = request.user
        completed_lessons = UserProgress.objects.filter(user=user, content_type='lesson', completed=True).values_list('content_id', flat=True)
        completed_challenges = UserProgress.objects.filter(user=user, content_type='challenge', completed=True).values_list('content_id', flat=True)
        completed_quizzes = UserProgress.objects.filter(user=user, content_type='quiz', completed=True).values_list('content_id', flat=True)
        return Response({
            'xp': user.xp,
            'level': user.level,
            'streak_count': user.streak_count,
            'completed_lessons': list(completed_lessons),
            'completed_challenges': list(completed_challenges),
            'completed_quizzes': list(completed_quizzes),
        })

    def retrieve(self, request, pk=None):
        course = get_object_or_404(Course, slug=pk)
        user = request.user
        all_lessons = Lesson.objects.filter(module__course=course)
        all_challenges = CodeChallenge.objects.filter(module__course=course)
        all_quizzes = Quiz.objects.filter(module__course=course)
        completed_ids = UserProgress.objects.filter(user=user, completed=True)
        completed_lessons = completed_ids.filter(content_type='lesson').values_list('content_id', flat=True)
        completed_challenges = completed_ids.filter(content_type='challenge').values_list('content_id', flat=True)
        completed_quizzes = completed_ids.filter(content_type='quiz').values_list('content_id', flat=True)
        total = all_lessons.count() + all_challenges.count() + all_quizzes.count()
        completed = len(completed_lessons) + len(completed_challenges) + len(completed_quizzes)
        return Response({
            'course_slug': course.slug,
            'total_items': total,
            'completed_items': completed,
            'progress_pct': round(completed / total * 100, 1) if total > 0 else 0,
        })
