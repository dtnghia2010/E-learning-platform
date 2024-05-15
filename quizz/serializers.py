from .models import Quizz
from rest_framework import serializers

class QuizzSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizz
        fields = '__all__'

class QuizzesViewByUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizz
        fields = ['quizz_name', 'quizz_id']
