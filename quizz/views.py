from .models import Quizz
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class QuizzByCode(APIView):
    def get(self, request, quizz_code):
        # auth_header = request.META.get('HTTP_AUTHORIZATION')
        # if not auth_header or not auth_header.startswith('Bearer '):
        #     print(auth_header)
        #
        #     raise AuthenticationFailed('Unauthenticated!')
        # token = auth_header.split(' ')[1]
        #
        # try:
        #     payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        # except jwt.ExpiredSignatureError:
        #     raise AuthenticationFailed('Authentication token expired!')
        # except jwt.InvalidTokenError:
        #     raise AuthenticationFailed('Invalid authentication token!')
        try:
            quizz = Quizz.objects.get(code=quizz_code)
        except Quizz.DoesNotExist:
            raise Http404
        return Response({'quizz_id': quizz.quizz_id})