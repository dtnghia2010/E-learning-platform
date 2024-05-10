from django.urls import path
# from quizz.models import Quizz
from .views import QuestionListByQuizz, ResultsByQuizz
urlpatterns = [
    path('quizz/<int:quizz_id>/questions/', QuestionListByQuizz.as_view()),
    path('quizz/<int:quizz_id>/results/', ResultsByQuizz.as_view())
    # path('quizz/<int:quizz_id>/questions/<int:question_id>', )
]