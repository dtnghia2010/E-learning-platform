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
    quizz_name = serializers.CharField(source='quizz_id.quizz_name', read_only=True)
    class Meta:
        model = Question
        fields = ['question_id', 'question', 'answers', 'quizz_name']

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question_id', 'question', 'answer']

# class QuestionAnswerListSerializer(serializers.ModelSerializer):
#     answers = AnswerListSerializer(source='answerlist_set', many=True, read_only=True)
#     class Meta:
#         model = Question
#         fields = ['question_id', 'question', 'answer', 'answers']
#
#     def validate_answer(self, value):
#         if not value.endswith("&True"):
#             raise serializers.ValidationError("The correct answer must end with '&True'")
#         return value


class QuestionAnswerListSerializer(serializers.ModelSerializer):
    answer1 = serializers.CharField(write_only=True)
    answer2 = serializers.CharField(write_only=True)
    answer3 = serializers.CharField(write_only=True)

    class Meta:
        model = Question
        fields = ['question', 'answer1', 'answer2', 'answer3']

    def create(self, validated_data):
        quizz_id = self.context.get('quizz')
        quizz = Quizz.objects.get(quizz_id=quizz_id)
        answer1 = validated_data.pop('answer1')
        answer2 = validated_data.pop('answer2')
        answer3 = validated_data.pop('answer3')

        correct_answer = answer1 if "&True" in answer1 else answer2 if "&True" in answer2 else answer3
        question = Question.objects.create(quizz=quizz, answer=correct_answer, **validated_data)

        # Create the associated AnswerList instance
        # AnswerList.objects.create(question_id=question, answer1=answer1, answer2=answer2, answer3=answer3)
        return question