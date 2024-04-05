from rest_framework import serializers
from .models import Document
from Chapter.serializers import ChapterNameSerializer
from Course.models import Course
from authentication.models import User


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

# class DocumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Document
#         fields = ['document_name','document_id']
#

class DocumentAllSerializer(serializers.ModelSerializer):
     class Meta:
         model = Document
         fields = "__all__"

class DocumentbyCourseSerializer(serializers.ModelSerializer):
    document_name = serializers.SerializerMethodField()
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)  # Sửa ở đây

    class Meta:
        model = Document
        fields = ['course_name', 'document_name']

    def get_document_name(self, obj):
        documents = Document.objects.filter(course_id=obj.course_id)
        return [doc.document_name for doc in documents]

