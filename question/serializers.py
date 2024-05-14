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
        counter = 0
        for i in range (3):
            correct_answer = validated_data.pop('correct_answer'+str(i+1))
            if correct_answer:
                counter = i+1
                break
        if counter == 1:
            answer = validated_data.pop('answer1')
        elif counter == 2:
            answer = validated_data.pop('answer2')
        else:
            answer = validated_data.pop('answer3')
        instance = self.Meta.model(quizz_id=quizz_id, answer=answer, **validated_data)
        instance.save()
        return instance