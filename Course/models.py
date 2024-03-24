from django.db import models

# Create your models here.

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=255)
    category_id = models.IntegerField()

    def __str__(self):
        return self.course_name
class Document(models.Model):
    document_id = models.AutoField(primary_key=True)
    document_name = models.CharField(max_length=255)
    description = models.TextField()
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='documents')

    def __str__(self):
        return self.document_name
