from django.db import models
from Course.models import Course
from authentication.models import User


# Create your models here.
class Document(models.Model):
    document_id = models.AutoField(primary_key=True)
    document_name = models.CharField(max_length=255)
    description = models.TextField()
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='documents')
    user_id = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, default=1)
    def __str__(self):
        return self.document_name
