from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.response import Response
from listOfAnswers.models import listOfAnswers
from listOfAnswers.serializers import listOfAnswersSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

# Create your views here.
class ListOfAnswersView(APIView):
    def get(self, request, answer_id = None):
        if answer_id:
            item = listOfAnswers.objects.filter(pk=answer_id)
            serializer = listOfAnswersSerializer(item)
        else:
            item = listOfAnswers.objects.all()
            serializer = listOfAnswersSerializer(item, many=True)
        return Response(serializer.data)

    def post(self, request, answer_id = None):
        serializer = listOfAnswersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, answer_id = None):
        try:
            answer = listOfAnswers.objects.filter(pk=answer_id)
            answer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except listOfAnswers.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)