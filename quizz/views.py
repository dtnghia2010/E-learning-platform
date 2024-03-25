from django.shortcuts import render
from rest_framework.views import APIView
from .models import Quizz
from .serializers import QuizzSerializer
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class QuizzView(APIView):
    def get(self, request, quizz_id=None):
        if quizz_id:
            quizz = Quizz.objects.get(pk=quizz_id)
            serializer = QuizzSerializer(quizz)
        else:
            quizz = Quizz.objects.all()
            serializer = QuizzSerializer(quizz, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuizzSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, quizz_id):
        try:
            saved_quizz = Quizz.objects.get(pk=quizz_id)
        except Quizz.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = QuizzSerializer(instance=saved_quizz, data= request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Course '{}' updated successfully".format(saved_quizz.quizz_name)})
    def delete(self, request, quizz_id=None):
        try:
            quizz = Quizz.objects.filter(id=quizz_id)
            quizz.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Quizz.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)