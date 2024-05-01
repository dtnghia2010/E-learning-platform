from .models import Category
from .serializers import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
import jwt
from django.db.utils import IntegrityError
from rest_framework.exceptions import AuthenticationFailed


# Create your views here.

class CategoryList(APIView):
    def get(self, request):

        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header or not auth_header.startswith('Bearer '):
            print(auth_header)
            raise AuthenticationFailed('Unauthenticated!')

        token = auth_header.split(' ')[1]

        # token = request.headers.get('Authorization')
        # if not token:
        #     raise AuthenticationFailed('Unauthenticated!')

        # auth_header = request.headers.get('Authorization')
        # if not auth_header or not auth_header.startswith('Bearer '):
        #     print(auth_header)
        #     raise AuthenticationFailed('Unauthenticated!')
        # token = auth_header.split(' ')[1]

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Authentication token expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid authentication token!')


        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({'error': 'Category name already exists'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    def get_object(self, category_id):

        # auth_header = request.META.get('HTTP_AUTHORIZATION')
        # if not auth_header or not auth_header.startswith('Bearer '):
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
        #
        try:
            return Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, category_id):
        category = self.get_object(category_id)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, category_id):
        category = self.get_object(category_id)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, category_id):
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response({'error': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)

        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
