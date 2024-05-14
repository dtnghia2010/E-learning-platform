from rest_framework import serializers
from .models import Question
from answerlist.models import AnswerList

class AnswerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerList
        fields = ['answer1', 'answer2', 'answer3']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerListSerializer(source='answerlist_set', many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['question_id', 'question', 'answers']

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question_id', 'question', 'answer']