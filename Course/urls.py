from django.urls import path
from .views import CourseView, createCourse

urlpatterns = [
    path('cate_<int:category_id>/', CourseView.as_view()),
    path('CreateCourse/', createCourse.as_view()),
]