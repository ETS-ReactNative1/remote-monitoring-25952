# Generated by Django 2.2.24 on 2021-08-03 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_auto_20210803_1328'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinformation',
            name='address',
            field=models.CharField(blank=True, default='', max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='userinformation',
            name='city',
            field=models.CharField(blank=True, default='', max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='userinformation',
            name='zip_code',
            field=models.CharField(blank=True, default='', max_length=64, null=True),
        ),
    ]