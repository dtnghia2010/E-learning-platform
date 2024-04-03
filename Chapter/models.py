from django.db import models
from Document.models import Document
from quizz.models import Quizz

class Chapter(models.Model):
    chapter_id = models.AutoField(primary_key=True)
    chapter_name = models.CharField(max_length=255)
    content = models.TextField()
    code = models.CharField(max_length=6, unique=True)
    quizz_id = models.ForeignKey(Quizz, on_delete=models.CASCADE, related_name='chapters')
    document_id = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='chapters')
    def __str__(self):
        return self.chapter_name