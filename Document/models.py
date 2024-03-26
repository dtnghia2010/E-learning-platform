from django.db import models
from Course.models import Course
# Create your models here.
class Document(models.Model):
    document_id = models.AutoField(primary_key=True)
    document_name = models.CharField(max_length=255)
    description = models.TextField()
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='documents')

    def __str__(self):
        return self.document_name
