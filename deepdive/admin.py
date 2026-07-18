from django.contrib import admin
from .models import DeepDiveLevel, DeepDiveSubSection, GoldenKey, IQPointTransaction, Certificate


class DeepDiveSubSectionInline(admin.TabularInline):
    model = DeepDiveSubSection
    extra = 0
    ordering = ['number']
    fields = ['number', 'title', 'is_exam', 'is_premium', 'golden_key_threshold']


@admin.register(DeepDiveLevel)
class DeepDiveLevelAdmin(admin.ModelAdmin):
    list_display = ['number', 'title', 'order', 'is_published']
    list_editable = ['order', 'is_published']
    inlines = [DeepDiveSubSectionInline]


@admin.register(DeepDiveSubSection)
class DeepDiveSubSectionAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'is_exam', 'is_premium', 'golden_key_threshold']
    list_filter = ['level', 'is_exam', 'is_premium']


@admin.register(GoldenKey)
class GoldenKeyAdmin(admin.ModelAdmin):
    list_display = ['user', 'subsection', 'earned_at', 'iq_points_earned']


@admin.register(IQPointTransaction)
class IQPointTransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'transaction_type', 'created_at']


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['user', 'level', 'earned_at', 'has_golden_key']
