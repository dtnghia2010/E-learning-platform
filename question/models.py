from django.db import models
from quizz.models import Quizz

# Create your models here.
class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    quizz_id = models.ForeignKey(Quizz, on_delete=models.CASCADE)

    def __str__(self):
        return self.question