# Generated by Django 2.2.24 on 2022-01-21 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0016_openedapp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hospital',
            name='slug',
        ),
    ]