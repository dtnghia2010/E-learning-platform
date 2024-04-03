from django.shortcuts import render
from .models import Chapter
from .serializers import ChapterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class ChapterView(APIView):
    def get(self, request, chapter_id):
        if chapter_id:
            chapter = Chapter.objects.get(chapter_id=chapter_id)
            serializer = ChapterSerializer(chapter)
        else:
            chapters = Chapter.objects.all()
            serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)