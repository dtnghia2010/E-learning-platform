from django.urls import path
# from .views import DocumentListView, DocumentDetailView, DocumentCreateView, DocumentUpdateView, DocumentDeleteView
from .views import DocumentView

urlpatterns = [
    path('document/', DocumentView.as_view()),
    path('document/documentdetial_id=<int:Document_id>/', DocumentView.as_view()),
]