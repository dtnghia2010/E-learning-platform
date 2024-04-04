from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
import jwt
from rest_framework import status

from authentication.models import User
from .models import Course
from .serializers import CourseSerializer


class CourseView(APIView):
    def get(self, request, category_id):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        courses = Course.objects.filter(category_id=category_id)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class CreateCourse(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Authentication token expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid authentication token!')

        user = User.objects.filter(id=payload['id']).first()

        print(request.data)
        serializer = CourseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course = serializer.save()

        course.ManyUser.add(user)
        course.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)