# Generated by Django 4.2.6 on 2024-04-03 13:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Chapter', '0001_initial'),
        ('Document', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='document_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='Document.document'),
        ),
    ]