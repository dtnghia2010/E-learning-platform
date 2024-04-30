from django.urls import path
from .views import ChapterView, ChapterCreateView

urlpatterns = [
    path('chapter/', ChapterView.as_view()),
    path('chapter/<int:chapter_id>/', ChapterView.as_view()),
    path('ChapterCreate/', ChapterCreateView.as_view()),
]