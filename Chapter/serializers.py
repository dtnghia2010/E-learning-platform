from rest_framework import serializers
from .models import Chapter

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = "__all__"

class ChapterNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['chapter_name']