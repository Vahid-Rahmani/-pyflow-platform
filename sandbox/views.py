from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import ExecuteCodeSerializer
from .engine import execute_code
from .ai_service import analyze_code, get_hint, explain_error, get_tutor_response


class ExecuteCodeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ExecuteCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = execute_code(serializer.validated_data['code'])
        return Response(result, status=status.HTTP_200_OK if result['success'] else status.HTTP_400_BAD_REQUEST)


class CodeReviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        code = request.data.get('code', '')
        result = analyze_code(code)
        return Response(result)


class HintView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        title = request.data.get('title', '')
        code = request.data.get('code', '')
        hint = get_hint(title, code)
        return Response({'hint': hint})


class ExplainErrorView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        error = request.data.get('error', '')
        explanation = explain_error(error)
        return Response({'explanation': explanation})


class TutorChatView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        message = request.data.get('message', '')
        user_level = getattr(request.user, 'programming_level', 'beginner') or 'beginner'
        history = request.data.get('history', [])
        if not message:
            return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)
        response_data = get_tutor_response(message, user_level, history)
        return Response(response_data)


class HealthView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({'status': 'ok'})
