# Generated by Django 4.2.7 on 2024-04-02 05:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Chapter', '0002_initial'),
        ('quizz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='quizz_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quizz.quizz'),
        ),
    ]
