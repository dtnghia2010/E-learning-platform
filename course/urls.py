from django.urls import path
from .views import CourseView

urlpatterns = [
    path('course/', CourseView.as_view()),
    path('course/<int:course_id>/', CourseView.as_view()),
]