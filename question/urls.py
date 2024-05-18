from django.urls import path
from .views import QuestionListByQuizz, ResultsByQuizz, QuestionAndAnswerListCreate, QuestionAndAnswerListUpdate

urlpatterns = [
    path('quizz/<int:quizz_id>/questions/', QuestionListByQuizz.as_view()),
    path('quizz/<int:quizz_id>/results/', ResultsByQuizz.as_view()),
    path('quizz/<int:quizz_id>/createQuestion/', QuestionAndAnswerListCreate.as_view()),
    path('quizz/<int:quizz_id>/updateQuestion/<int:question_id>/', QuestionAndAnswerListUpdate.as_view()),
]
