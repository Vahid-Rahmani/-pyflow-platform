from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.utils import timezone
from .models import DeepDiveLevel, DeepDiveSubSection, GoldenKey, IQPointTransaction, Certificate
from .serializers import (
    DeepDiveLevelSerializer, DeepDiveSubSectionDetailSerializer,
    GoldenKeySerializer, CertificateSerializer
)


class DeepDiveLevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DeepDiveLevel.objects.filter(is_published=True)
    serializer_class = DeepDiveLevelSerializer
    lookup_field = 'number'
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}


class DeepDiveSubSectionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DeepDiveSubSectionDetailSerializer
        return DeepDiveSubSectionDetailSerializer

    def get_queryset(self):
        level_number = self.kwargs.get('level_number')
        if level_number:
            return DeepDiveSubSection.objects.filter(level__number=level_number)
        return DeepDiveSubSection.objects.all()

    @action(detail=True, methods=['post'])
    def complete_exam(self, request, level_number=None, pk=None):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        subsection = self.get_object()
        if not subsection.is_exam:
            return Response({'error': 'This section is not an exam'}, status=status.HTTP_400_BAD_REQUEST)

        score = request.data.get('score', 0)
        total = request.data.get('total', 0)

        iq_earned = int((score / max(total, 1)) * 50)
        golden_key, created = GoldenKey.objects.get_or_create(
            user=request.user,
            subsection=subsection,
            defaults={'iq_points_earned': iq_earned}
        )

        IQPointTransaction.objects.create(
            user=request.user,
            subsection=subsection,
            amount=iq_earned,
            transaction_type='earned',
            description=f'Exam: {subsection.title} - {score}/{total} correct'
        )

        passed = score >= max(total * 0.7, 1)
        return Response({
            'passed': passed,
            'score': score,
            'total': total,
            'iq_earned': iq_earned,
            'golden_key_earned': created,
        })

    @action(detail=True, methods=['post'])
    def earn_iq(self, request, level_number=None, pk=None):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        subsection = self.get_object()
        amount = request.data.get('amount', 10)

        txn = IQPointTransaction.objects.create(
            user=request.user,
            subsection=subsection,
            amount=amount,
            transaction_type='earned',
            description=request.data.get('description', 'Task completed')
        )

        total_iq = sum(
            t.amount for t in IQPointTransaction.objects.filter(
                user=request.user,
                transaction_type='earned'
            )
        )

        threshold = subsection.golden_key_threshold
        golden_key_earned = False
        if total_iq >= threshold:
            _, golden_key_earned = GoldenKey.objects.get_or_create(
                user=request.user,
                subsection=subsection,
                defaults={'iq_points_earned': total_iq}
            )

        return Response({
            'amount': amount,
            'total_iq': total_iq,
            'golden_key_earned': golden_key_earned,
        })

    @action(detail=True, methods=['get'])
    def export_markdown(self, request, level_number=None, pk=None):
        subsection = self.get_object()
        md = self._to_obsidian_md(subsection)
        resp = HttpResponse(md, content_type='text/markdown; charset=utf-8')
        filename = f"learnapp-level{subsection.level.number}-sec{subsection.number}-{subsection.title}.md"
        filename = filename.replace(' ', '-').lower()
        resp['Content-Disposition'] = f'attachment; filename="{filename}"'
        return resp

    def _to_obsidian_md(self, sub):
        lines = []
        lines.append(f'# {sub.title}')
        lines.append(f'**Level {sub.level.number} · Sub-section {sub.number}**')
        lines.append('')
        lines.append('---')
        lines.append('')
        if sub.theory:
            import re
            clean = re.sub(r'<[^>]+>', '', sub.theory)
            lines.append(clean)
        lines.append('')
        lines.append('---')
        lines.append('')
        if sub.mcqs:
            lines.append('## Multiple Choice Questions')
            lines.append('')
            for i, mcq in enumerate(sub.mcqs, 1):
                lines.append(f'### {i}. {mcq.get("question", "")}')
                for opt in mcq.get('options', []):
                    marker = '[x]' if opt.get('correct') else '[ ]'
                    lines.append(f'- {marker} {opt.get("text", "")}')
                if mcq.get('explanation'):
                    lines.append(f'  - *Explanation:* {mcq["explanation"]}')
                lines.append('')
        if sub.fill_blanks:
            lines.append('## Fill in the Blanks')
            lines.append('')
            for fb in sub.fill_blanks:
                lines.append(f'- {fb.get("sentence", "")}')
                lines.append(f'  - *Answer:* ||{fb.get("answer", "")}||')
            lines.append('')
        if sub.writing_exercises:
            lines.append('## Writing Exercises')
            lines.append('')
            for we in sub.writing_exercises:
                lines.append(f'### {we.get("prompt", "")}')
                if we.get('rubric'):
                    lines.append(f'*Rubric:* {we["rubric"]}')
                lines.append('')
        lines.append('---')
        lines.append(f'*Exported from LearnApp · {timezone.now().strftime("%Y-%m-%d %H:%M")}*')
        return '\n'.join(lines)


class GoldenKeyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GoldenKeySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GoldenKey.objects.filter(user=self.request.user)


class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Certificate.objects.filter(user=self.request.user)
