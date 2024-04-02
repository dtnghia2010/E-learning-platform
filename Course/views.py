from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
import jwt

from .models import Course
from .serializers import CourseSerializer


class CourseView(APIView):
    def get(self, request, category_id):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Authentication token expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid authentication token!')

        courses = Course.objects.filter(category_id=category_id)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class createCourse(APIView):
    def post(self, request):
        print(request.data)
        serializer = CourseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)