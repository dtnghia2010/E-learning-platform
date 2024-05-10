from rest_framework import serializers
from .models import Document
from Course.models import Course
from authentication.models import User
from django.shortcuts import get_object_or_404

from Chapter.serializers import ChapterNameAndIDSerializer


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class DocumentSerializerbyCourse(serializers.ModelSerializer):
    author_name = serializers.CharField(source='user_id.username', read_only=True)
    class Meta:
        model = Document
        fields = ['document_name','document_id','author_name']

class DocumentDetailSerializer(serializers.ModelSerializer):
    chapters_info = ChapterNameAndIDSerializer(source='chapters',many=True, read_only=True)
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)
    author_name = serializers.CharField(source='user_id.username', read_only=True)
    class Meta:
        model = Document
        fields = ['course_id', 'course_name', 'document_name', 'author_name', 'description', 'chapters_info']
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
        fields = ['document_id', 'document_name', 'course_name' ]

    def get_document_name(self, obj):
        documents = Document.objects.filter(course_id=obj.course_id)
        return [doc.document_name for doc in documents]

class DocumentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['document_id', 'course_id', 'document_name', 'description', 'user_id']

    def create(self, validated_data):
        print(validated_data)
        course_name = validated_data.pop('course_id', None)
        username = validated_data.pop('user_id', None)
        course = get_object_or_404(Course, course_name=course_name)
        user = get_object_or_404(User, username=username)

        return Document.objects.create(course_id=course, user_id=user, **validated_data)
class DocumentNameAndIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['document_name', 'document_id']

class DocumentViewByUserSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)
    class Meta:
        model = Document
        fields = ['document_name', 'document_id', 'course_name']

