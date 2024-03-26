from django.db import models
from authentication.models import User
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=255)
    category_id = models.IntegerField()
    ManyUser = models.ManyToManyField('authentication.User', related_name='courses')

    def __str__(self):
        return self.course_name

class Bookmark(models.Model):
    bookmark_id = models.AutoField(primary_key=True)
    bookmark = models.BooleanField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='User')
    document_id = models.ForeignKey('Document.Document', on_delete=models.CASCADE, related_name='chapters')

    def __str__(self):
        return self.bookmark
