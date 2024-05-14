from rest_framework import serializers
from .models import AnswerList
from question.models import Question


class CreateAnswerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerList
        fields = ['answer1', 'answer2', 'answer3', 'question_id']
