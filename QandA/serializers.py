from .models import QandA
from rest_framework import serializers

class QandASerializer(serializers.ModelSerializer):
    class Meta:
        model = QandA
        fields = '__all__'