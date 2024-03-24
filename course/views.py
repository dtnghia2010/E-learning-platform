from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CourseSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Course

# Create your views here.
class CourseView(APIView):

    def get(self, request, course_id=None):
        if course_id:
            courses = Course.objects.get(pk=course_id)
            serializer = CourseSerializer(courses)
        else:
            courses = Course.objects.all()
            serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, course_id):
        try:
            saved_course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CourseSerializer(instance=saved_course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Course '{}' updated successfully".format(saved_course.course_name)})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, course_id):
        try:
            course = Course.objects.get(pk=course_id)
            course.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)