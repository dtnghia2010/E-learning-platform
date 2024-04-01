from django.db import models
from question.models import Question

# Create your models here.
class AnswerList(models.Model):
    answer_id = models.AutoField(primary_key=True)
    answer1 = models.CharField(max_length=255)
    answer2 = models.CharField(max_length=255)
    answer3 = models.CharField(max_length=255)
    question_id = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.answer
