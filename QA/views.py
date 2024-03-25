from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.response import Response
from QA.models import QandA
from QA.serializers import QandASerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

# Create your views here.
class QandAView(APIView):
    def get(self, request, question_id=None):
        if question_id:
            item = QandA.objects.get(pk=question_id)
            serializer = QandASerializer(item)
        else:
            item = QandA.objects.all()
            serializer = QandASerializer(item, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QandASerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, question_id):
        try:
            saved_item = QandA.objects.get(pk=question_id)
        except QandA.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = QandASerializer(instance=saved_item, data= request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Course '{}' updated successfully".format(saved_item.quizz_name)})
    def delete(self, request, question_id=None):
        try:
            item = QandA.objects.filter(id=question_id)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except QandA.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)