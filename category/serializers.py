from rest_framework import serializers
from .models import Category
class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'