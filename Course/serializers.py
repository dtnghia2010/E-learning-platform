from rest_framework import serializers
from .models import Course
from Document.serializers import DocumentAllSerializer
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseDetailSerializer(serializers.ModelSerializer):
    document_name = DocumentAllSerializer(source='chapters',many=True, read_only=True)
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)
    class Meta:
        model = Course
        fields = ['course_name', 'document_name']