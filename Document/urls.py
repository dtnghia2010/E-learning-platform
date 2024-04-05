from django.urls import path
from .views import GetAllDocumentsByCourse


urlpatterns = [
    path('Document/', GetAllDocumentsByCourse.as_view()),
]