# Generated by Django 2.2.24 on 2021-09-14 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0014_auto_20210909_1057'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinformation',
            name='state',
            field=models.CharField(blank=True, default='', max_length=64, null=True),
        ),
    ]
