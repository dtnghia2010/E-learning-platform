from django.urls import path
from .views import QandAView

urlpatterns = [
    path('QandA/', QandAView.as_view()),
    path('QandA/<int:QandA_id>/', QandAView.as_view())
]