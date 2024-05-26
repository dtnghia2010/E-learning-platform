from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .serializers import CreateAnswerListSerializer
import jwt

class CreateAnswerList(APIView):
    def post(self, request):
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
        print(request.data)
        serializer = CreateAnswerListSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)