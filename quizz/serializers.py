from .models import Quizz
from authentication.models import User
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from category.models import Category

class QuizzSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizz
        fields = '__all__'

class QuizzesViewByUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizz
        fields = ['quizz_name', 'quizz_id']

class QuizzCreateSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True)
    class Meta:
        model = Quizz
        fields = ['quizz_id','category_name', 'quizz_name', 'code', 'user_id']
    def create(self, validated_data):
        print(validated_data)
        # category_id = validated_data.pop('category_id', None)
        category_name = validated_data.pop('category_name', None)
        category = get_object_or_404(Category, category_name=category_name)
        username = validated_data.pop('user_id', None)
        user = get_object_or_404(User, username=username)
        return Quizz.objects.create(user_id=user, category_id=category,**validated_data)
        # category = get_object_or_404(Category, category_name=category_id)

