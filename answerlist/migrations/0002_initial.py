# Generated by Django 4.2.7 on 2024-04-05 16:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('question', '0001_initial'),
        ('answerlist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='answerlist',
            name='question_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question.question'),
        ),
    ]
