from django.shortcuts import render
# from jwt import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from Course.models import Course
# Create your views here.
from .models import Document
from .serializers import DocumentSerializer, DocumentbyCourseSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer
from rest_framework.exceptions import AuthenticationFailed


class GetAllDocumentsByCourse(APIView):
  def get(self, request, course_id=None):
            if course_id:
                course = Course.objects.filter(course_id=course_id).first()
                serializer = DocumentbyCourseSerializer(course.documents.all(), many=True)
            else:
                courses = Course.objects.all()
                serializer = DocumentbyCourseSerializer([doc for course in courses for doc in course.documents.all()],
                                                        many=True)
            return Response({"documents": serializer.data})
# class GetAllDocumentsByCourse(APIView):
#     def get(self, request, course_id=None):
#         if course_id:
#             documents = Document.objects.filter(course_id=course_id)
#             serializer = DocumentSerializer(documents, many=True)
#         else:
#             documents = Document.objects.all()
#             serializer = DocumentSerializer(documents, many=True)
#         return Response(serializer.data)

  def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


  def put(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DocumentSerializer(instance=document, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Document '{}' updated successfully".format(document.document_name)})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
            document.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# class GetAllDocumentsByCourse(APIView):
#     def get(self, request):
#         course_id = request.GET.get('course_id')
#         documents = Document.objects.filter(course_id=course_id)
#         data = []
#         for document in documents:
#             data.append({
#                 'course_name': document.course_id.course_name,
#                 'document_name': document.document_name,
#                 'author_name': document.username.username,  # Sửa ở đây
#             })
#         return Response(data)

# class GetAllDocumentsAPIView(APIView):
#
#     def get(self, request):
#         list_document = Document.objects.all()
#         mydata = GetAllDocumentSerializer(list_document, many=True)
#         return Response (data=mydata.data, status= status.HTTP_200_OK)