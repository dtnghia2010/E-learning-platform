from rest_framework import serializers
from .models import Course, Bookmark
from category.models import Category


class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True)
    category_id = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'category_name', 'category_id']

    def create(self, validated_data):
        category_name = validated_data.pop('category_name')
        category = Category.objects.get(category_name=category_name)
        instance = self.Meta.model(category_id=category, **validated_data)
        instance.save()
        return instance