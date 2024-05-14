from django.urls import path
from .views import QuizzByCode

urlpatterns = [
    # path('quizz', ),
    # path('quizz/<int:quizz_id>', ),
    # path('quizz/<int:quizz_id>/questions/', ),
    path('quizz/code/<str:quizz_code>/', QuizzByCode.as_view()),
]