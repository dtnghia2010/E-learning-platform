from rest_framework import serializers
from .models import AnswerList
from question.models import Question


class CreateAnswerListSerializer(serializers.ModelSerializer):
    question_id = serializers.CharField()
    class Meta:
        model = AnswerList
        fields = ['answer1', 'answer2', 'answer3', 'question_id']

    def create(self, validated_data):
        question_id = validated_data.pop('question_id')
        question = Question.objects.get(question_id=question_id)
        instance = self.Meta.model(question_id=question, **validated_data)
        instance.save()
        return instance