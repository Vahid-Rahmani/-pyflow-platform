from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import Plan, Subscription
from .serializers import PlanSerializer, SubscriptionSerializer


class PlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Plan.objects.filter(is_active=True)
    serializer_class = PlanSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class SubscriptionViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request):
        sub = Subscription.objects.filter(user=request.user).first()
        if sub:
            return Response(SubscriptionSerializer(sub).data)
        return Response({'status': 'none'})

    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        plan_id = request.data.get('plan_id')
        if not plan_id:
            return Response({'error': 'plan_id required'}, status=status.HTTP_400_BAD_REQUEST)
        plan = Plan.objects.filter(id=plan_id, is_active=True).first()
        if not plan:
            return Response({'error': 'Invalid plan'}, status=status.HTTP_404_NOT_FOUND)
        sub, created = Subscription.objects.update_or_create(
            user=request.user,
            defaults={
                'plan': plan,
                'status': 'active',
                'expires_at': timezone.now() + timedelta(days=30),
            }
        )
        return Response(SubscriptionSerializer(sub).data)

    @action(detail=False, methods=['post'])
    def cancel(self, request):
        sub = Subscription.objects.filter(user=request.user, status='active').first()
        if not sub:
            return Response({'error': 'No active subscription'}, status=status.HTTP_400_BAD_REQUEST)
        sub.status = 'canceled'
        sub.canceled_at = timezone.now()
        sub.save()
        return Response({'status': 'canceled'})
