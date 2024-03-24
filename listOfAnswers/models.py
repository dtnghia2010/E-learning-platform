from django.db import models

# Create your models here.
class listOfAnswers(models.Model):
    answer_id = models.AutoField(primary_key=True)
    answer = models.CharField(max_length=255)
    question_id = models.ForeignKey('QandA.QandA', on_delete=models.CASCADE)

    def __str__(self):
        return self.answer
