# Generated by Django 5.0 on 2024-04-05 15:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Course', '0004_remove_course_manyuser_course_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='User',
            new_name='User_id',
        ),
    ]
