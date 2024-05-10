from rest_framework import serializers
from .models import Chapter
from Document.models import Document
from quizz.models import Quizz
class ChapterSerializer(serializers.ModelSerializer):
    document_id = serializers.CharField()
    class Meta:
        model = Chapter
        fields = ['chapter_id', 'chapter_name', 'content', 'code', 'quizz_id', 'document_id']


class ChapterNameAndIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['chapter_id','chapter_name']


class ChapterCreateSerializer(serializers.ModelSerializer):
    document_id = serializers.CharField()
    class Meta:
        model = Chapter
        fields = ['chapter_id', 'chapter_name', 'content', 'code', 'document_id']
        #     input data only includes chapter_name, content, code

    def create(self, validated_data):
        document_id = validated_data.pop('document_id')
        document = Document.objects.get(document_id=document_id)
        code = validated_data.get('code')
        print(code)
        quizz = Quizz.objects.get(code=code)
        instance = self.Meta.model(document_id=document, quizz_id=quizz, **validated_data)
        instance.save()
        return instance

