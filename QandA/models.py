from django.db import models

# Create your models here.
class QandA(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.TextField()
    answer = models.CharField(max_length=255)
    quizz_id = models.ForeignKey('quizz.Quizz', on_delete=models.CASCADE,default=1)

    def __str__(self):
        return self.question
