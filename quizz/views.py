from django.shortcuts import render
from .models import Quizz
from rest_framework.views import APIView
from .serializers import QuizzSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
# class QuizView(APIView):
#     def get(self):
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from .models import Quizz
from .serializers import QuizzSerializer
import jwt

User = get_user_model()

class GetAllQuizzesByUser(APIView):
    def get(self, request, user_id=None):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header or not auth_header.startswith('Bearer '):
            print(auth_header)
            raise AuthenticationFailed('Unauthenticated!')
        token = auth_header.split(' ')[1]

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Authentication token expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid authentication token!')

        user = User.objects.filter(id=payload['id']).first()

        quizzes = Quizz.objects.filter(user_id=user.id)
        serializer = QuizzesViewByUserSerializer(quizzes, many=True)
        return Response(serializer.data)

