from rest_framework import serializers
from .models import Course, Bookmark


class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category_id')
    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'category_name']

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance