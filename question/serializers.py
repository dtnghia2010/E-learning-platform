from rest_framework import serializers
from .models import Question
from answerlist.models import AnswerList

class AnswerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerList
        fields = ['answer1', 'answer2', 'answer3']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerListSerializer(source='answerlist_set', many=True, read_only=True)
    quizz_name = serializers.CharField(source='quizz_id.quizz_name', read_only=True)
    class Meta:
        model = Question
        fields = ['question_id', 'question', 'answers', 'quizz_name']

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question_id', 'question', 'answer']