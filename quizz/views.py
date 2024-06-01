from .models import Quizz
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import QuizzSerializer, QuizzCreateSerializer
from rest_framework import status
# Create your views here.
# class QuizView(APIView):
#     def get(self):
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from .models import Quizz
from .serializers import QuizzSerializer, QuizzesViewByUserSerializer
import jwt

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Quizz
from rest_framework.exceptions import AuthenticationFailed
from authentication.models import User

class QuizzByCode(APIView):
    def get(self, request, quizz_code):
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

        try:
            quizz = Quizz.objects.get(code=quizz_code)
            return Response({'quizz_id': quizz.quizz_id})
        except Quizz.DoesNotExist:
            raise Http404

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

        if user is None:
            raise AuthenticationFailed('User not found!')
        print(request.data)
        quizz = Quizz.objects.filter(user_id=user.id)
        serializer = QuizzesViewByUserSerializer(quizz, many=True)
        return Response(serializer.data)

class CreateQuizz(APIView):
    def post (self, request):
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

        user_id = payload['id']

        data = request.data.copy()
        data['user_id'] = user_id
        print(f"User1: {user_id}")
        serializer = QuizzCreateSerializer(data=data, context={'request': data, 'view': self})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# class GetAllQuizzesByUser(APIView):
#     def get(self, request, user_id=None):
#         auth_header = request.META.get('HTTP_AUTHORIZATION')
#         if not auth_header or not auth_header.startswith('Bearer '):
#             print(auth_header)
#             raise AuthenticationFailed('Unauthenticated!')
#         token = auth_header.split(' ')[1]
#
#         try:
#             payload = jwt.decode(token, 'secret', algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Authentication token expired!')
#         except jwt.InvalidTokenError:
#             raise AuthenticationFailed('Invalid authentication token!')
#
#         user = User.objects.filter(id=payload['id']).first()
#
#         quizzes = Quizz.objects.filter(user_id=user.id)
#         serializer = QuizzesViewByUserSerializer(quizzes, many=True)
#         return Response(serializer.data)

class QuizzByCode(APIView):
    def get(self, request, quizz_code):
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
        try:
            quizz = Quizz.objects.get(code=quizz_code)
        except Quizz.DoesNotExist:
            raise Http404
        return Response({'quizz_id': quizz.quizz_id})