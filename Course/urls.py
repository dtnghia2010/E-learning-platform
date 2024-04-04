from django.urls import path
from .views import CourseView, CreateCourse

urlpatterns = [
    path('cate_<int:category_id>/', CourseView.as_view()),
    path('CreateCourse/', CreateCourse.as_view()),
]