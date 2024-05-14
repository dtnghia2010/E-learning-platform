from django.shortcuts import render

from answerlist.models import AnswerList
from .models import Question
# Create your views here.
from .models import Question
from .serializers import QuestionSerializer, ResultsSerializer, QuestionandAnswerCreateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from answerlist.views import CreateAnswerList
import jwt

class QuestionListByQuizz(APIView):
    def get(self, request, quizz_id = None):
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
        if quizz_id:
            questions = Question.objects.filter(quizz_id=quizz_id)
            serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

class ResultsByQuizz(APIView):
    def get(self, request, quizz_id = None):
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
        if quizz_id:
            results = Question.objects.filter(quizz_id=quizz_id)
            serializer = ResultsSerializer(results, many=True)
        return Response(serializer.data)

class CreateQuestionAndAnswer(APIView):
    def post(self, request, quizz_id):
        # auth_header = request.META.get('HTTP_AUTHORIZATION')
        # if not auth_header or not auth_header.startswith('Bearer '):
        #     print(auth_header)
        #     raise AuthenticationFailed('Unauthenticated!')
        #
        # token = auth_header.split(' ')[1]
        #
        # try:
        #     payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        # except jwt.ExpiredSignatureError:
        #     raise AuthenticationFailed('Authentication token expired!')
        # except jwt.InvalidTokenError:
        #     raise AuthenticationFailed('Invalid authentication token!')

        data = request.data.copy()
        data['quizz_id'] = quizz_id
        serializer = QuestionandAnswerCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        question_id = serializer.instance.question_id
        request.data['question_id'] = question_id
        answer_list_view = CreateAnswerList()
        return answer_list_view.post(request)