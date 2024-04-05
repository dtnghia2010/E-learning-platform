from django.urls import path
# from .views import DocumentListView, DocumentDetailView, DocumentCreateView, DocumentUpdateView, DocumentDeleteView
from .views import DocumentView
from .views import GetAllDocumentsByCourse


urlpatterns = [
    path('alldocuments/', DocumentView.as_view()),
    path('document/documentdetial_id=<int:Document_id>/', DocumentView.as_view()),
    path('documentbycourse/', GetAllDocumentsByCourse.as_view()),
]