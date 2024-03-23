from django.db import models
from course.models import Course
# Create your models here.

class Document(models.Model):
    document_id = models.AutoField(primary_key=True)
    document_name = models.CharField(max_length=255)
    description = models.CharField(max_length=100)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)