from django.urls import path
# from .views import DocumentListView, DocumentDetailView, DocumentCreateView, DocumentUpdateView, DocumentDeleteView
from .views import DocumentView
from .views import GetAllDocumentsByCourse
from .views import CreateDocument


urlpatterns = [
    path('alldocuments/', DocumentView.as_view()),
    path('document/documentdetail_id=<int:Document_id>/', DocumentView.as_view()),
    path('documentbycourse/', GetAllDocumentsByCourse.as_view()),
    path('course/<int:course_id>/createdocument/', CreateDocument.as_view()),
]