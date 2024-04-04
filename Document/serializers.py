from rest_framework import serializers
from .models import Document
from Chapter.serializers import ChapterNameSerializer
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class DocumentDetailSerializer(serializers.ModelSerializer):
    chapters_name = ChapterNameSerializer(source='chapters',many=True, read_only=True)
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)
    class Meta:
        model = Document
        fields = ['course_name', 'document_name', 'description', 'chapters_name']