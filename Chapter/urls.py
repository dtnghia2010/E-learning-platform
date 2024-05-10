from django.urls import path
from .views import ChapterView
from.views import CreateChapter
from.views import UpdateChapter
urlpatterns = [
    path('chapter/', ChapterView.as_view()),
    path('chapter/<int:chapter_id>/', ChapterView.as_view()),
    path('document/<int:document_id>/createchapter/', CreateChapter.as_view()),
    path('updateChapter/<int:chapter_id>/', UpdateChapter.as_view()),
]