from django.contrib import admin
from .models import Course, Module, Lesson, CodeChallenge, Quiz, Question, Answer, Project


class ModuleInline(admin.StackedInline):
    model = Module
    extra = 0


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ModuleInline]


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


@admin.register(CodeChallenge)
class CodeChallengeAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 2


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    inlines = [QuestionInline]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'language', 'is_public', 'created_at']
    list_filter = ['language', 'is_public']
