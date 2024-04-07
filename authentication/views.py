import datetime
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        # token = jwt.encode(payload, 'secret', algorithm='HS256')
        # response = Response()
        # response.set_cookie(key='jwt', value=token, httponly=True)
        # response.data = {
        #     'jwt': token
        # }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response['Authorization'] = f'Bearer {token}'  # Set token in the header
        # headers = {
        #     'Authorization': f'Bearer {token}'
        # }
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):
    def get(self, request):
        # token = request.COOKIES.get('jwt')
        #         # if not token:
        #         #     raise AuthenticationFailed('Unauthenticated!')

        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            # print(auth_header)
            raise AuthenticationFailed('unauthenticated!')
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

        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
# def registerPage(request):
#     if request.user.is_authenticated:
#         return redirect('home')
#     else:
#         form = CreateUserForm()
#         if request.method == 'POST':
#             form = CreateUserForm(request.POST)
#             if form.is_valid():
#                 form.save()
#                 user = form.cleaned_data.get('username')
#                 messages.success(request, 'Account was created for ' + user)
#
#                 return redirect('login')
#
#         context = {'form': form}
#         return render(request, 'register.html', context)
#
#
# def loginPage(request):
#     if request.user.is_authenticated:
#         return redirect('home')
#     else:
#         if request.method == "POST":
#             username = request.POST.get('username')
#             password = request.POST.get('password')
#             user = authenticate(request, username=username, password=password)
#             print("check")
#             if user is not None:
#                 login(request, user)
#                 return redirect('home')
#             else:
#                 messages.info(request, 'Username or password is incorrect')
#     context = {}
#     return render(request, 'login.html', context)
#
# @login_required(login_url='login')
# def logoutPage(request):
#     logout(request)
#     return redirect('login')
#
#
# @login_required(login_url='login')
# def homePage(request):
#     context = {}
#     return render(request, 'dashboard.html', context)

#
