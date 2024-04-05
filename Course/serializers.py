from rest_framework import serializers
from .models import Course, Bookmark
from category.models import Category
from authentication.models import User


class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True)
    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'category_name']

    def create(self, validated_data):
        category_name = validated_data.pop('category_name')
        category = Category.objects.get(category_name=category_name)
        user_id = self.context['user_id']
        user = User.objects.get(id=user_id)
        instance = self.Meta.model(category_id=category, user_id=user, **validated_data)
        instance.save()
        return instance

class CourseViewSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(source='category_id')
    class Meta:
        model = Course
        fields = ['course_id', 'course_name','category_id', 'category']