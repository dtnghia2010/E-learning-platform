from django.urls import path
from .views import QuizzView

urlpatterns = [
    path('quizz/', QuizzView.as_view()),
    path('quizz/<int:quizz_id>/', QuizzView.as_view())
]