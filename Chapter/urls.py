from django.urls import path
from .views import ChapterView, CreateChapter

urlpatterns = [
    path('chapter/', ChapterView.as_view()),
    path('chapter/<int:chapter_id>/', ChapterView.as_view()),
    path('ChapterCreate/', CreateChapter.as_view()),
]