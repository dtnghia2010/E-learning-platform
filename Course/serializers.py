from rest_framework import serializers
from .models import Course, Bookmark
from category.models import Category


class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True)
    user_id = serializers.IntegerField(source='user_id', read_only=True)
    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'category_name']

    def create(self, validated_data):
        category_name = validated_data.pop('category_name')
        category = Category.objects.get(category_name=category_name)
        user_id = validated_data.pop('user_id')
        instance = self.Meta.model(category_id=category,user_id = user_id, **validated_data)
        instance.save()
        return instance

class CourseViewSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(source='category_id')
    class Meta:
        model = Course
        fields = ['course_id', 'course_name','category_id', 'category']
#
# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'

class CourseDetailSerializer(serializers.ModelSerializer):
    document_name = DocumentAllSerializer(source='chapters',many=True, read_only=True)
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)
    class Meta:
        model = Course
        fields = ['course_name', 'document_name']