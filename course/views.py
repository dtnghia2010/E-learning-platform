from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CourseSerializer
from rest_framework.response import Response
from .models import Course

# Create your views here.
class CourseView(APIView):

    def get(self, request):
        courses = Course.objects.all()
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
