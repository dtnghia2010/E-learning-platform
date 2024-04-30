from django.urls import path
from .views import ChapterView
from .views import createChapter

urlpatterns = [
    path('chapter/', ChapterView.as_view()),
    path('chapter/<int:chapter_id>/', ChapterView.as_view()),
    path('createChapter/', createChapter.as_view()),
]