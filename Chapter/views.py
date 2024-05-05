from django.shortcuts import render

from rest_framework.exceptions import AuthenticationFailed
import jwt
from .models import Chapter
from .serializers import ChapterSerializer, ChapterCreateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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

class CreateChapter(APIView):
    def post(self, request,document_id):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('Unauthenticated!')

        data = request.data.copy()
        data['document_id'] = document_id
        serializer = ChapterCreateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateChapter(APIView):
    def put(self, request, chapter_id):
            auth_header = request.META.get('HTTP_AUTHORIZATION')
            if not auth_header or not auth_header.startswith('Bearer '):
                print(auth_header)

                raise AuthenticationFailed('Unauthenticated!')
            token = auth_header.split(' ')[1]
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Authentication token expired!')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid authentication token!')

            user_id = payload['id']

            try:
                save_chapter = Chapter.objects.get(chapter_id=chapter_id)
            except Chapter.DoesNotExist:
                return Response(
                    status=status.HTTP_404_NOT_FOUND
                )
            data = request.data.copy()
            # Only update the 'code', 'title' and 'content' fields
            data['code'] = request.data.get('code')
            data['chapter_name'] = request.data.get('chapter_name')
            data['content'] = request.data.get('content')
            serializer = ChapterCreateSerializer(instance=save_chapter, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                # Create a new serializer with the updated chapter
                updated_chapter_serializer = ChapterSerializer(save_chapter)
                return Response({
                    "success": "Chapter '{}' updated successfully".format(save_chapter.chapter_name),
                    "chapter": updated_chapter_serializer.data
                })
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def put(self, request, chapter_id):
    #     auth_header = request.META.get('HTTP_AUTHORIZATION')
    #     if not auth_header or not auth_header.startswith('Bearer '):
    #         print(auth_header)
    #
    #         raise AuthenticationFailed('Unauthenticated!')
    #     token = auth_header.split(' ')[1]
    #     try:
    #         payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    #     except jwt.ExpiredSignatureError:
    #         raise AuthenticationFailed('Authentication token expired!')
    #     except jwt.InvalidTokenError:
    #         raise AuthenticationFailed('Invalid authentication token!')
    #
    #     user_id = payload['id']
    #
    #     try:
    #         save_chapter = Chapter.objects.get(chapter_id=chapter_id)
    #     except Chapter.DoesNotExist:
    #         return Response(
    #             status=status.HTTP_404_NOT_FOUND
    #         )
    #     data = request.data.copy()
    #     # Only update the 'code', 'title' and 'content' fields
    #     data['code'] = request.data.get('code')
    #     data['chapter_name'] = request.data.get('chapter_name')
    #     data['content'] = request.data.get('content')
    #     serializer = ChapterCreateSerializer(instance=save_chapter, data=data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({
    #             "success": "Chapter '{}' updated successfully".format(save_chapter.chapter_name)
    #         })
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)