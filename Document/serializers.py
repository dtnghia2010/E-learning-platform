from rest_framework import serializers
from Document.models import Document
from rest_framework import serializers
from Course.models import Course
from authentication.models import User
from rest_framework import serializers
from .models import Document


from rest_framework import serializers
from .models import Document

class Document_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"

class DocumentAllSerializer(serializers.ModelSerializer):
     class Meta:
         model = Document
         fields = ['document_name']



class DocumentSerializer(serializers.ModelSerializer):
    # author_name = serializers.CharField(source='username.username', read_only=True)
    course_name = serializers.CharField(source='course_id.course_name', read_only=True)

    class Meta:
        model = Document
        fields = ('document_name', 'course_name')


         # class GetAllDocumentSerializer(serializers.ModelSerializer):
         #     author_name = serializers.CharField(source='author.username', read_only=True)
         #     from rest_framework import serializers

         # class GetAllDocumentSerializer(serializers.ModelSerializer):
         #         author_name = serializers.CharField(source='author.username', read_only=True)
         #         course_name = serializers.CharField(source='course.name', read_only=True)
         #
         #         class Meta:
         #             model = Document
         #             fields = ('document_name', 'author_name', 'course_name')
         #
         #         def __init__(self, *args, course_id=None, **kwargs):
         #             super(GetAllDocumentSerializer, self).__init__(*args, **kwargs)
         #             if course_id is not None:
         #                 self.fields['document_name'].queryset = Document.objects.filter(course_id=course_id)
         #
         #         def to_representation(self, instance):
         #             data = super().to_representation(instance)
         #             user = User.objects.get(id=instance.course.created_by_id)
         #             data['course_creator'] = user.username
         #             return data



