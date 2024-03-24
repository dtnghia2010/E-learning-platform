from django.shortcuts import render
from rest_framework.views import APIView
from .models import Document
from .serializers import DocumentSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class DocumentView(APIView):
    def get(self, request, document_id=None):
        if document_id:
            document = Document.objects.get(pk=document_id)
            serializer = DocumentSerializer(document)
        else:
            document = Document.objects.all()
            serializer = DocumentSerializer(document, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, document_id):
        try:
            saved_document = Document.objects.get(pk=document_id)
            saved_document.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
