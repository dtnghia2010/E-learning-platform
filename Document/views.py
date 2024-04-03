import datetime
import jwt
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Document
from .serializers import DocumentSerializer

# Create your views here.
class DocumentView(APIView):
    def get(self, request, Document_id=None):
        if Document_id:
            document = Document.objects.get(document_id=Document_id)
            serializer = DocumentSerializer(document)
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

    def put(self, request, document_id):
        try:
            saved_document = Document.objects.get(pk=document_id)
        except Document.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = DocumentSerializer(instance=saved_document, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                "success": "Document '{}' updated successfully".format(saved_document.document_name)
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, document_id):
        # Get object with this pk
        document = Document.objects.get(pk=document_id)
        document.delete()
        return Response({
            "message": "Document with id `{}` has been deleted.".format(document_id)
        }, status=204)


