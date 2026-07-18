from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class DeepDiveLevel(models.Model):
    number = models.PositiveIntegerField(unique=True, verbose_name=_('Level number'))
    title = models.CharField(max_length=200, verbose_name=_('Title'))
    subtitle = models.CharField(max_length=300, blank=True, verbose_name=_('Subtitle'))
    description = models.TextField(blank=True, verbose_name=_('Description'))
    icon = models.CharField(max_length=10, default='📘')
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']
        verbose_name = _('Deep-Dive Level')
        verbose_name_plural = _('Deep-Dive Levels')

    def __str__(self):
        return f'Level {self.number}: {self.title}'


class DeepDiveSubSection(models.Model):
    level = models.ForeignKey(DeepDiveLevel, on_delete=models.CASCADE, related_name='subsections')
    number = models.PositiveIntegerField(verbose_name=_('Sub-section number'))
    title = models.CharField(max_length=200, verbose_name=_('Title'))
    description = models.TextField(blank=True, verbose_name=_('Description'))
    is_exam = models.BooleanField(default=False, verbose_name=_('Is exam'))
    is_premium = models.BooleanField(default=False, verbose_name=_('Is premium'))
    order = models.PositiveIntegerField(default=0)

    theory = models.TextField(blank=True, verbose_name=_('Theory (HTML)'))
    mcqs = models.JSONField(default=list, blank=True, verbose_name=_('MCQs'))
    fill_blanks = models.JSONField(default=list, blank=True, verbose_name=_('Fill-in-the-blank'))
    writing_exercises = models.JSONField(default=list, blank=True, verbose_name=_('Writing exercises'))

    golden_key_threshold = models.PositiveIntegerField(default=100, verbose_name=_('IQ points for golden key'))

    class Meta:
        ordering = ['level__number', 'number']
        unique_together = ['level', 'number']
        verbose_name = _('Deep-Dive Sub-Section')
        verbose_name_plural = _('Deep-Dive Sub-Sections')

    def __str__(self):
        return f'Level {self.level.number}.{self.number}: {self.title}'


class GoldenKey(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='golden_keys')
    subsection = models.ForeignKey(DeepDiveSubSection, on_delete=models.CASCADE, related_name='golden_keys')
    earned_at = models.DateTimeField(auto_now_add=True)
    iq_points_earned = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ['user', 'subsection']
        verbose_name = _('Golden Key')
        verbose_name_plural = _('Golden Keys')

    def __str__(self):
        return f'{self.user.username} - Golden Key: {self.subsection.title}'


class IQPointTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('earned', _('Earned')),
        ('spent', _('Spent')),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='iq_transactions')
    subsection = models.ForeignKey(DeepDiveSubSection, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.IntegerField(verbose_name=_('Amount'))
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('IQ Point Transaction')
        verbose_name_plural = _('IQ Point Transactions')

    def __str__(self):
        return f'{self.user.username} {self.transaction_type} {self.amount} IQ'


class Certificate(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='certificates')
    level = models.ForeignKey(DeepDiveLevel, on_delete=models.CASCADE, related_name='certificates')
    earned_at = models.DateTimeField(auto_now_add=True)
    has_golden_key = models.BooleanField(default=False)
    iq_points_total = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ['user', 'level']
        verbose_name = _('Certificate')
        verbose_name_plural = _('Certificates')

    def __str__(self):
        return f'{self.user.username} - Certificate: {self.level.title}'
