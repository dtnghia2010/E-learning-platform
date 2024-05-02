from django.urls import path
from .views import CourseView, CreateCourse
from .views import CourseDetailView

urlpatterns = [
    path('allcoursesbycategory_id=<int:category_id>/', CourseView.as_view()),
    path('createcourse/', CreateCourse.as_view()),
    path('course_detail/<int:course_id>/', CourseDetailView.as_view()),
]
