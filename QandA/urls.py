from django.urls import path
from .views import QandAView

urlpatterns = [
    path('qanda/', QandAView.as_view()),
    path('qanda/<int:QandA_id>/', QandAView.as_view())
]