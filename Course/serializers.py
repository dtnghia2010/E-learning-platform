from rest_framework import serializers
from .models import Course, Bookmark
from category.models import Category
from Document.serializers import DocumentAllSerializer
from authentication.models import User


class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True)
    # user_id = serializers.IntegerField(source='user_id', read_only=True)
    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'category_name', 'user_id']

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


class CourseDetailSerializer(serializers.ModelSerializer):
    document_name = DocumentAllSerializer(source='chapters',many=True, read_only=True)
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)
    class Meta:
        model = Course
        fields = ['course_name', 'document_name']