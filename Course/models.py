from django.db import models
from authentication.models import User
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

from authentication.models import User
from django.contrib.auth.models import AbstractUser, Group, Permission
from category.models import Category

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=255)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    User_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses', default=1)

    def __str__(self):
        return self.course_name


class Bookmark(models.Model):
    bookmark_id = models.AutoField(primary_key=True)
    bookmark = models.BooleanField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    document_id = models.ForeignKey('Document.Document', on_delete=models.CASCADE, related_name='bookmarks')

    def __str__(self):
        return self.bookmark