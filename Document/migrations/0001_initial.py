# Generated by Django 4.2.6 on 2024-04-03 13:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Course', '0002_remove_document_course_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('document_id', models.AutoField(primary_key=True, serialize=False)),
                ('document_name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='Course.course')),
            ],
        ),
    ]
