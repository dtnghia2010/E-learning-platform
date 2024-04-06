from django.urls import path
from .views import CategoryList, CategoryDetail

urlpatterns = [
    path('category/', CategoryList.as_view()),
    path('category/<int:category_id>/', CategoryDetail.as_view()),
]
