from django.db import models

# Create your models here.
class QandA(models.Model):
    question_id = models.IntegerField(primary_key=True)
    question = models.TextField()
    answer = models.CharField(max_length=255)

    def __str__(self):
        return self.question
