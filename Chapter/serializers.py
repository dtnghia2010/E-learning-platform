from rest_framework import serializers
from .models import Chapter
from Document.models import Document
from quizz.models import Quizz
class ChapterSerializer(serializers.ModelSerializer):
    document_name = serializers.CharField(write_only=True)
    class Meta:
        model = Chapter
        fields = ['chapter_id', 'chapter_name', 'content', 'code', 'document_name']

    def create(self, validated_data):
        document_name = validated_data.pop('document_name')
        document = Document.objects.get(document_name=document_name)
        code = validated_data.get('code')
        quizz = Quizz.objects.get(code=code)
        instance = self.Meta.model(document_id=document, quizz_id=quizz, **validated_data)
        instance.save()
        return instance

class ChapterNameAndIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['chapter_id','chapter_name']