from django.db import models
from category.models import Category
from Course.models import Course
from authentication.models import User


# Create your models here.
class Quizz(models.Model):
    quizz_id = models.AutoField(primary_key=True)
    quizz_name = models.CharField(max_length=255)
    code = models.CharField(max_length=6, unique=True)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, default=1)
    def __str__(self):
        return self.quizz_name



# class QuizzList(models.Model):
#     quizz_id = models.ForeignKey(Quizz, on_delete=models.CASCADE)
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return self

