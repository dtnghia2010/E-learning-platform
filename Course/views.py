import datetime
import jwt
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from Document.models import Document
from Document.serializers import DocumentSerializer
from .models import Course
from .serializers import CourseDetailSerializer, CourseSerializer
from rest_framework.exceptions import AuthenticationFailed
import jwt
# Create your views here.
class CourseDetailView(APIView):
    def get(self, request, Course_id=None, course_id=None):
        # token = request.COOKIES.get('jwt')
        # if not token:
        #     raise AuthenticationFailed('Unauthenticated!')

        # try:
        #     payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        # except jwt.ExpiredSignatureError:
        #     raise AuthenticationFailed('Authentication token expired!')
        # except jwt.InvalidTokenError:
        #     raise AuthenticationFailed('Invalid authentication token!')

        if course_id is not None:
            try:
                course = Course.objects.get(pk=course_id)
            except Course.DoesNotExist:
                return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

            documents = Document.objects.filter(course_id=course_id)
            document_serializer = DocumentSerializer(documents, many=True)

            response_data = {
                "course_name": course.course_name,
                "documents": document_serializer.data  # Danh sách tài liệu của khóa học cụ thể
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Course ID is required"}, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, Document_id):
        try:
            saved_document = Course.objects.get(document_id=Document_id)
        except Course.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = CourseSerializer(instance=saved_document, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": "Document '{}' updated successfully".format(saved_document.document_name)
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, Document_id):
        try:
            document = Course.objects.get(document_id=Document_id)
            document.delete()
            return Response({"message": "Document with id `{}` has been deleted.".format(Document_id)}, status=204)
        except Course.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )