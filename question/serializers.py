from rest_framework import serializers
from .models import Question
from quizz.models import Quizz
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

class QuestionandAnswerCreateSerializer(serializers.ModelSerializer):
    quizz_id = serializers.CharField()
    class Meta:
        model = Question
        fields = ['question_id', 'question', 'answer', 'quizz_id']

    def create(self, validated_data):
        quizz_id = validated_data.pop('quizz_id')
        quizz = Quizz.objects.get(quizz_id=quizz_id)
        question = validated_data.get('question')
        answer = validated_data.get('answer')
        instance = self.Meta.model(quizz_id=quizz_id, question=question, answer=answer)
        instance.save()
        return instance