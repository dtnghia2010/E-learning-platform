from django.urls import path
from .views import GetAllDocumentsByCourse


urlpatterns = [
    path('', GetAllDocumentsByCourse.as_view(), name='get_all_documents_by_course'),
]