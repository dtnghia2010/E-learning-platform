from django.urls import path, include
# from quizz.models import Quizz
from .views import QuestionListByQuizz, ResultsByQuizz, QuestionAndAnswerListCreate
from answerlist.views import CreateAnswerList
urlpatterns = [
    path('quizz/<int:quizz_id>/questions/', QuestionListByQuizz.as_view()),
    path('quizz/<int:quizz_id>/results/', ResultsByQuizz.as_view()),
    path('quizz/<int:quizz_id>/createQuestion/', QuestionAndAnswerListCreate.as_view())
    # path('quizz/<int:quizz_id>/questions/<int:question_id>', )
]