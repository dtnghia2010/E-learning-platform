from .models import listOfAnswers
from rest_framework import serializers

class listOfAnswersSerializer(serializers):
    class Meta:
        model = listOfAnswers
        fields = '__all__'