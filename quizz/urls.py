from django.urls import path
from .views import QuizzView

urlpatterns = [
    path('quizz/', QuizzView.as_view()),
    path('quizz/<int:quiz_id>/', QuizzView.as_view())
]