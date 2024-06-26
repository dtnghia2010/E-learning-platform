# Generated by Django 5.0 on 2024-03-26 07:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('course_name', models.CharField(max_length=255)),
                ('category_id', models.IntegerField()),
                ('ManyUser', models.ManyToManyField(related_name='courses', to='authentication.user')),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('document_id', models.AutoField(primary_key=True, serialize=False)),
                ('document_name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='Course.course')),
            ],
        ),
        migrations.CreateModel(
            name='Bookmark',
            fields=[
                ('bookmark_id', models.AutoField(primary_key=True, serialize=False)),
                ('bookmark', models.BooleanField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='User', to='authentication.user')),
                ('document_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='Course.document')),
            ],
        ),
    ]
