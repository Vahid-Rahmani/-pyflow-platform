from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Course(models.Model):
    DIFFICULTY_CHOICES = [
        ('beginner', _('Beginner')),
        ('intermediate', _('Intermediate')),
        ('advanced', _('Advanced')),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    icon = models.CharField(max_length=50, default='code')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        unique_together = ['course', 'slug']

    def __str__(self):
        return f'{self.course.title} - {self.title}'


class Lesson(models.Model):
    LESSON_TYPES = [
        ('text', _('Text')),
        ('code', _('Code Challenge')),
        ('quiz', _('Quiz')),
    ]

    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    content = models.TextField(blank=True)
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPES, default='text')
    xp_reward = models.PositiveIntegerField(default=10)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        unique_together = ['module', 'slug']

    def __str__(self):
        return self.title


class CodeChallenge(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='challenges')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    instruction = models.TextField()
    starter_code = models.TextField(default='')
    solution_code = models.TextField()
    test_code = models.TextField(default='')
    difficulty = models.CharField(max_length=20, choices=Course.DIFFICULTY_CHOICES, default='beginner')
    xp_reward = models.PositiveIntegerField(default=20)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        unique_together = ['module', 'slug']

    def __str__(self):
        return self.title


class Quiz(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    xp_reward = models.PositiveIntegerField(default=15)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        unique_together = ['module', 'slug']

    def __str__(self):
        return self.title


class Question(models.Model):
    QUESTION_TYPES = [
        ('multiple_choice', _('Multiple Choice')),
        ('true_false', _('True/False')),
        ('fill_blank', _('Fill in the Blank')),
    ]

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default='multiple_choice')
    explanation = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question_text[:50]


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    answer_text = models.CharField(max_length=500)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.answer_text


class UserProgress(models.Model):
    CONTENT_TYPES = [
        ('lesson', _('Lesson')),
        ('challenge', _('Challenge')),
        ('quiz', _('Quiz')),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='progress')
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    content_id = models.PositiveIntegerField()
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'content_type', 'content_id']

    def __str__(self):
        return f'{self.user.username} - {self.content_type} {self.content_id}'


class LearningPath(models.Model):
    LEVEL_CHOICES = [
        ('beginner', _('Complete beginner')),
        ('basic', _('Basic knowledge')),
        ('intermediate', _('Intermediate')),
        ('advanced', _('Advanced')),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    target_level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    target_goal = models.CharField(max_length=20, blank=True, null=True)
    estimated_days = models.PositiveIntegerField(default=30)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class PathMilestone(models.Model):
    learning_path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='milestones')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    courses = models.ManyToManyField(Course, blank=True)
    modules = models.ManyToManyField(Module, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.learning_path.title} - {self.title}'


class UserLearningPath(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='learning_paths')
    learning_path = models.ForeignKey(LearningPath, on_delete=models.CASCADE)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ['user', 'learning_path']

    def __str__(self):
        return f'{self.user.username} -> {self.learning_path.title}'


class MilestoneProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='milestone_progress')
    milestone = models.ForeignKey(PathMilestone, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'milestone']

    def __str__(self):
        return f'{self.user.username} - {self.milestone.title}: {"✓" if self.completed else "○"}'


class Project(models.Model):
    LANGUAGES = [
        ('python', 'Python'),
        ('javascript', 'JavaScript'),
        ('html', 'HTML'),
        ('sql', 'SQL'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    code = models.TextField(default='')
    language = models.CharField(max_length=20, choices=LANGUAGES, default='python')
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
