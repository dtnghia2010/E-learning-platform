from django.urls import path
from .views import CourseDetailView

urlpatterns = [
    path('course_detail/<int:course_id>/', CourseDetailView.as_view()),
]
