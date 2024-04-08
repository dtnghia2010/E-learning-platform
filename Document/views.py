from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import DocumentSerializer, DocumentDetailSerializer, DocumentbyCourseSerializer, \
    DocumentSerializerbyCourse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Course.models import Course
from .models import Document
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import jwt

from .serializers import DocumentSerializer, DocumentbyCourseSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer
from rest_framework.exceptions import AuthenticationFailed

# Create your views here.
class DocumentView(APIView):
    def get(self, request, Document_id=None):
        print(request)
        token:str = request.headers.get('Authorization')
        accessToken: str= token.split(" ")[1]
        # accessToken=
        print(accessToken)
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(accessToken, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Authentication token expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid authentication token!')

        if Document_id:
            document = Document.objects.filter(document_id=Document_id).first()
            # document = Document.objects.get(document_id=Document_id)
            serializer = DocumentDetailSerializer(document)
        else:
            documents = Document.objects.all()
            serializer = DocumentSerializer(documents, many=True)
        return Response({"documents": serializer.data})

    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, Document_id):
        try:
            saved_document = Document.objects.get(document_id=Document_id)
        except Document.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = DocumentSerializer(instance=saved_document, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": "Document '{}' updated successfully".format(saved_document.document_name)
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, Document_id):
        try:
            document = Document.objects.get(document_id=Document_id)
            document.delete()
            return Response({"message": "Document with id `{}` has been deleted.".format(Document_id)}, status=204)
        except Document.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )



class GetAllDocumentsByCourse(APIView):
  # authentication_classes = [TokenAuthentication]
  # permission_classes = [IsAuthenticated]
  def get(self, request, course_id=None):
            token = request.COOKIES.get('jwt')
            if not token:
                raise AuthenticationFailed('Unauthenticated!')
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Authentication token expired!')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid authentication token!')

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
        serializer = DocumentSerializerbyCourse(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


  def put(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DocumentSerializerbyCourse(instance=document, data=request.data, partial=True)
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
