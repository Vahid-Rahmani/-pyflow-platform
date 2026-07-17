from rest_framework import serializers


class ExecuteCodeSerializer(serializers.Serializer):
    code = serializers.CharField()
    language = serializers.ChoiceField(choices=['python'], default='python')
