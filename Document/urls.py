from django.urls import path, include
# from .views import DocumentListView, DocumentDetailView, DocumentCreateView, DocumentUpdateView, DocumentDeleteView
from .views import DocumentView
from .views import GetAllDocumentsByCourse
from .views import CreateDocument
from .views import UpdateDocument
from .views import DocumentViewByUser


urlpatterns = [
    path('alldocuments/', DocumentView.as_view()),
    path('document/documentdetail_id=<int:Document_id>/', DocumentView.as_view()),
    path('document/documentdetail_id=<int:Document_id>/', include('Chapter.urls')),
    path('documentbycourse/', GetAllDocumentsByCourse.as_view()),
    path('course/<int:course_id>/createdocument/', CreateDocument.as_view()),
    path('updateDocument/<int:Document_id>/', UpdateDocument.as_view()),
    path('alldocumentbyuser/', DocumentViewByUser.as_view())
]