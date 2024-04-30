from django.shortcuts import render
from .models import Chapter
from .serializers import ChapterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Document.models import Document
from rest_framework.exceptions import AuthenticationFailed
import jwt
# Create your views here.

class ChapterView(APIView):
    def get(self, request, chapter_id=None):
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

    def put(self, request, chapter_id):
        try:
            save_chapter = Chapter.objects.get(pk=chapter_id)
        except Chapter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ChapterSerializer(instance=save_chapter, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Chapter '{}' updated successfully".format(save_chapter.chapter_name)})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, chapter_id):
        try:
            chapter = Chapter.objects.get(pk=chapter_id)
            chapter.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Chapter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class createChapter(APIView):
    def post(self, request, Document_id):
        mutable_data = request.data.copy()  # Convert QueryDict to dictionary
        mutable_data['document_id'] = Document_id # Add document to data
        # print(mutable_data)
        serializer = ChapterSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)