from django.db import models
from category.models import Category


# Create your models here.
class Quizz(models.Model):
    quizz_id = models.AutoField(primary_key=True)
    quizz_name = models.CharField(max_length=255)
    code = models.CharField(max_length=6, unique=True)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    chapter_id = models.IntegerField()

    def __str__(self):
        return self.quizz_name

class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    quizz_id = models.ForeignKey(Quizz, on_delete=models.CASCADE)

    def __str__(self):
        return self.question

class AnswerList(models.Model):
    answer_id = models.AutoField(primary_key=True)
    answer = models.CharField(max_length=255)
    question_id = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.answer
