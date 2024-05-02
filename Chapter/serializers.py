from django.shortcuts import get_object_or_404
from rest_framework import serializers

from Document.models import Document
from quizz.models import Quizz
from .models import Chapter

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = "__all__"

class ChapterNameAndIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['chapter_id','chapter_name']

class ChapterCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['chapter_name', 'content', 'code']

    def create(self, validated_data):
        return Chapter.objects.create(**validated_data)

class ChapterCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['chapter_id', 'chapter_name', 'content', 'code', 'quizz_id', 'document_id']

    def create(self, validated_data):
        quizz_id = validated_data.pop('quizz_id', None)
        document_id = validated_data.pop('document_id', None)
        quizz = get_object_or_404(Quizz, quizz_id=quizz_id)
        document = get_object_or_404(Document, document_id=document_id)

        return Chapter.objects.create(quizz_id=quizz, document_id=document, **validated_data)
