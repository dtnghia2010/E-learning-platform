from django.urls import path
from.views import GetAllQuizzesByUser

urlpatterns = [
    # path('quizz', ),
    # path('quizz/<int:quizz_id>', ),
    # path('quizz/<int:quizz_id>/questions/', ),
    path('getAllQuizzesByUser/', GetAllQuizzesByUser.as_view()),
]