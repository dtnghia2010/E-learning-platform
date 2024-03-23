from .models import Course
from rest_framework import serializers

class courseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'