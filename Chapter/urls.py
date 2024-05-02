from django.urls import path
from .views import ChapterView

urlpatterns = [
    path('chapter/', ChapterView.as_view()),
    path('document/<int:document_id>/createchapter/', CreateChapter.as_view()),
]