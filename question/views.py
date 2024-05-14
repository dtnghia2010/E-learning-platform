from django.shortcuts import render

from answerlist.models import AnswerList
from answerlist.serializers import CreateAnswerListSerializer
from .models import Question
# Create your views here.
from .models import Question
from .serializers import QuestionSerializer, ResultsSerializer, QuestionAnswerListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from answerlist.serializers import CreateAnswerListSerializer
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

class QuestionAndAnswerListCreate(APIView):
    def post(self, request, quizz_id):
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

        question_serializer = QuestionAnswerListSerializer(data=request.data, context={'quizz': quizz_id})
        if question_serializer.is_valid():
            question = question_serializer.save()
            answer1_data = request.data.get('answer1')
            answer2_data = request.data.get('answer2')
            answer3_data = request.data.get('answer3')
            question_id = question.question_id
            answer_list_data = {'answer1': answer1_data, 'answer2': answer2_data, 'answer3': answer3_data, 'question_id': question_id}
            answer_serializer = CreateAnswerListSerializer(data=answer_list_data)
            if answer_serializer.is_valid():
                answer_serializer.save()
                print(answer_serializer.data)
            else:
                return Response(answer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(question_serializer.data, status=status.HTTP_201_CREATED)
        return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)