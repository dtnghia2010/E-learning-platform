# Generated by Django 4.2.6 on 2024-04-05 18:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_remove_user_name'),
        ('Document', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='authentication.user'),
        ),
    ]