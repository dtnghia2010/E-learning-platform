from django.urls import path
from .views import DocumentView

urlpatterns = [
    path('document/', DocumentView.as_view()),
    path('document/<int:document_id>/', DocumentView.as_view()),
]