from rest_framework import serializers
from .models import Course, Bookmark

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'category_id']


    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance