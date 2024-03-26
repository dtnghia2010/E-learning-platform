from django.shortcuts import render
from .models import Quizz
from rest_framework.views import APIView
from .serializers import QuizzSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
# class QuizView(APIView):
#     def get(self):
