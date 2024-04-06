from django.urls import path
# from quizz.models import Quizz

urlpatterns = [
    path('quizz/<int:quizz_id>/questions/', ),
    path('quizz/<int:quizz_id>/questions/<int:question_id>', )
]