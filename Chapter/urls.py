from django.urls import path
from .views import ChapterView

urlpatterns = [
    path('chapter/', ChapterView.as_view(), name='chapter'),
    path('chapter/<int:chapter_id>/', ChapterView.as_view(), name='chapter'),
]