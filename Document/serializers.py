from rest_framework import serializers
from Document.models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"

class DocumentAllSerializer(serializers.ModelSerializer):
     class Meta:
         model = Document
         fields = ['document_name']


