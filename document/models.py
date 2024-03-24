from django.db import models

class Document(models.Model):
    document_id = models.AutoField(primary_key=True)
    document_name = models.CharField(max_length=255)
    description = models.CharField(max_length=2000)
    course_id = models.ForeignKey('course.Course', on_delete=models.CASCADE)