from django.db import models
from authentication.models import User

# Create your models here.

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=255)
    category_id = models.IntegerField()
    ManyUsers = models.ManyToManyField('User', related_name='courses')

    def __str__(self):
        return self.course_name
class Document(models.Model):
    document_id = models.AutoField(primary_key=True)
    document_name = models.CharField(max_length=255)
    description = models.TextField()
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='documents')

    def __str__(self):
        return self.document_name

class Chapter(models.Model):
    chapter_id = models.AutoField(primary_key=True)
    chapter_name = models.CharField(max_length=255)
    content = models.TextField()
    code = models.ForeignKey('Quiz', on_delete=models.CASCADE)
    document_id = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='chapters')

    def __str__(self):
        return self.chapter_name

class Bookmark(models.Model):
    bookmark_id = models.AutoField(primary_key=True)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='bookmarks')
    bookmark = models.BooleanField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='User')
    document_id = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='chapters')

    def __str__(self):
        return self.bookmark