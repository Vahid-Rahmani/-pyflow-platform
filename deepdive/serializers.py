from rest_framework import serializers
from .models import DeepDiveLevel, DeepDiveSubSection, GoldenKey, IQPointTransaction, Certificate


class DeepDiveSubSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeepDiveSubSection
        fields = ['id', 'number', 'title', 'description', 'is_exam', 'is_premium',
                  'order', 'golden_key_threshold']


class DeepDiveSubSectionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeepDiveSubSection
        fields = ['id', 'number', 'title', 'description', 'is_exam', 'is_premium',
                  'order', 'theory', 'mcqs', 'fill_blanks', 'writing_exercises',
                  'golden_key_threshold']


class DeepDiveLevelSerializer(serializers.ModelSerializer):
    subsections = DeepDiveSubSectionSerializer(many=True, read_only=True)
    subsection_count = serializers.SerializerMethodField()
    completed_count = serializers.SerializerMethodField()

    class Meta:
        model = DeepDiveLevel
        fields = ['id', 'number', 'title', 'subtitle', 'description', 'icon',
                  'order', 'subsections', 'subsection_count', 'completed_count']

    def get_subsection_count(self, obj):
        return obj.subsections.count()

    def get_completed_count(self, obj):
        user = self.context.get('request').user if 'request' in self.context else None
        if user and user.is_authenticated:
            return GoldenKey.objects.filter(
                user=user,
                subsection__level=obj
            ).count()
        return 0


class GoldenKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoldenKey
        fields = ['id', 'subsection', 'earned_at', 'iq_points_earned']


class IQPointTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IQPointTransaction
        fields = ['id', 'subsection', 'amount', 'transaction_type', 'description', 'created_at']


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'level', 'earned_at', 'has_golden_key', 'iq_points_total']
