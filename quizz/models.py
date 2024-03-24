from django.db import models

# Create your models here.
class Quizz(models.Model):
    quizz_id = models.AutoField(primary_key=True)
    quizz_name = models.CharField(max_length=255)
    code = models.CharField(max_length=6)
    question_id = models.ForeignKey('QandA.QandA', on_delete=models.CASCADE)
    # category_id = models.ForeignKey('category', on_delete=models.CASCADE)
    # chapter_id = models.ForeignKey()

    def __str__(self):
        return self.quizz_name
