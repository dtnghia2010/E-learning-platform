from django.urls import path, include
# from .views import DocumentListView, DocumentDetailView, DocumentCreateView, DocumentUpdateView, DocumentDeleteView
from .views import DocumentView
from .views import GetAllDocumentsByCourse


urlpatterns = [
    path('alldocuments/', DocumentView.as_view()),
    path('document/documentdetail_id=<int:Document_id>/', DocumentView.as_view()),
    path('document/documentdetail_id=<int:Document_id>/', include('Chapter.urls')),
    path('documentbycourse/', GetAllDocumentsByCourse.as_view()),
]