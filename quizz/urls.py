from django.urls import path
from .views import QuizzByCode
from.views import GetAllQuizzesByUser

urlpatterns = [
    # path('quizz', ),
    # path('quizz/<int:quizz_id>', ),
    # path('quizz/<int:quizz_id>/questions/', ),
    path('quizz/code/<str:quizz_code>/', QuizzByCode.as_view()),
    path('getAllQuizzesByUser/', GetAllQuizzesByUser.as_view()),
]