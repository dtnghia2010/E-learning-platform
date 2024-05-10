from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
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

        if Document_id:
            document = Document.objects.filter(document_id=Document_id).first()
            # document = Document.objects.get(document_id=Document_id)
            serializer = DocumentDetailSerializer(document)
        else:
            documents = Document.objects.all()
            serializer = DocumentSerializer(documents, many=True)
        return Response({"documents": serializer.data})

    # def put(self, request, Document_id):
    #     try:
    #         saved_document = Document.objects.get(document_id=Document_id)
    #     except Document.DoesNotExist:
    #         return Response(
    #             status=status.HTTP_404_NOT_FOUND
    #         )
    #     serializer = DocumentSerializer(instance=saved_document, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({
    #             "success": "Document '{}' updated successfully".format(saved_document.document_name)
    #         })
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    # def delete(self, request, Document_id):
    #     try:
    #         document = Document.objects.get(document_id=Document_id)
    #         document.delete()
    #         return Response({"message": "Document with id `{}` has been deleted.".format(Document_id)}, status=204)
    #     except Document.DoesNotExist:
    #         return Response(
    #             status=status.HTTP_404_NOT_FOUND
    #         )



class GetAllDocumentsByCourse(APIView):
      # authentication_classes = [TokenAuthentication]
      # permission_classes = [IsAuthenticated]
      def get(self, request, course_id=None):
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

                if course_id:
                    course = Course.objects.filter(course_id=course_id).first()
                    serializer = DocumentbyCourseSerializer(course.documents.all(), many=True)
                else:
                    courses = Course.objects.all()
                    serializer = DocumentbyCourseSerializer([doc for course in courses for doc in course.documents.all()],
                                                            many=True)
                return Response({"documents": serializer.data})
      # def post(self, request):
      #       serializer = DocumentSerializerbyCourse(data=request.data)
      #       if serializer.is_valid():
      #           serializer.save()
      #           return Response(serializer.data, status=status.HTTP_201_CREATED)
      #       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      #
      #
      # def put(self, request, document_id):
      #       try:
      #           document = Document.objects.get(pk=document_id)
      #       except Document.DoesNotExist:
      #           return Response(status=status.HTTP_404_NOT_FOUND)
      #       serializer = DocumentSerializerbyCourse(instance=document, data=request.data, partial=True)
      #       if serializer.is_valid():
      #           serializer.save()
      #           return Response({"success": "Document '{}' updated successfully".format(document.document_name)})
      #       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      #
      # def delete(self, request, document_id):
      #       try:
      #           document = Document.objects.get(pk=document_id)
      #           document.delete()
      #           return Response(status=status.HTTP_204_NO_CONTENT)
      #       except Document.DoesNotExist:
      #           return Response(status=status.HTTP_404_NOT_FOUND)


class CreateDocument(APIView):
    def post(self, request, course_id):
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

        data = request.data.copy()
        data['course_id'] = course_id
        data['user_id'] = user_id
        print(f"User1: {user_id}")
        serializer = DocumentCreateSerializer(data=data, context={'request': data, 'view': self})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateDocument(APIView):
    def put(self, request, Document_id):
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
            save_document = Document.objects.get(document_id=Document_id)
        except Document.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )
        data = request.data.copy()
        # Only update the 'course', 'title' and 'description' fields
        data['course_id'] = request.data.get('course_id')
        data['document_name'] = request.data.get('document_name')
        data['description'] = request.data.get('description')
        serializer = DocumentCreateSerializer(instance=save_document, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": "Document '{}' updated successfully".format(save_document.document_name)
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAllDocumentsByUser(APIView):
    def get(self, request, user_id=None):
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

        user = User.objects.filter(id=payload['id']).first()

        print(request.data)
        document = Document.objects.filter(user_id=user.id)
        serializer = DocumentViewByUserSerializer(document, many=True)
        return Response(serializer.data)

class DeleteDocument(APIView):
    def delete(self, request, Document_id):
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
            document = Document.objects.get(document_id=Document_id)
            document.delete()
            return Response({"message": "Document `{}` has been deleted.".format(document.document_name)}, status=204)
        except Document.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )