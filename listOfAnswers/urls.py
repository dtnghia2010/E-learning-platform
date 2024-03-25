from django.urls import path
from .views import ListOfAnswersView

urlpatterns = [
    path('listofanswers/', ListOfAnswersView.as_view()),
    path('listofanswers/<int:answer_id>/', ListOfAnswersView.as_view())
]