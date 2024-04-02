from django.urls import path
from .views import CourseView, createCourse

urlpatterns = [
    path('category/<int:category_id>', CourseView.as_view()),
    path('CreateCourse/', createCourse.as_view()),
]