from rest_framework import serializers
from .models import Course, Module, Lesson, CodeChallenge, Quiz, Question, Answer, UserProgress, Project


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer_text']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'question_type', 'answers', 'order']
        read_only_fields = ['id', 'order']


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'slug', 'content', 'lesson_type', 'xp_reward', 'order']
        read_only_fields = ['id']


class CodeChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeChallenge
        fields = ['id', 'title', 'slug', 'instruction', 'starter_code', 'difficulty', 'xp_reward', 'order']
        read_only_fields = ['id']


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'slug', 'questions', 'xp_reward', 'order']


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    challenges = CodeChallengeSerializer(many=True, read_only=True)
    quizzes = QuizSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'title', 'slug', 'description', 'order', 'lessons', 'challenges', 'quizzes']


class CourseListSerializer(serializers.ModelSerializer):
    module_count = serializers.SerializerMethodField()
    lesson_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'short_description', 'icon', 'difficulty', 'order', 'module_count', 'lesson_count']

    def get_module_count(self, obj):
        return obj.modules.count()

    def get_lesson_count(self, obj):
        return Lesson.objects.filter(module__course=obj).count()


class CourseDetailSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'description', 'short_description', 'icon', 'difficulty', 'order', 'modules']


class CodeSubmitSerializer(serializers.Serializer):
    code = serializers.CharField()


class QuizSubmitSerializer(serializers.Serializer):
    answers = serializers.ListField(
        child=serializers.DictField()
    )


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'code', 'language', 'is_public', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
