# Generated by Django 2.2.24 on 2021-09-24 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_userinformation_state'),
    ]

    operations = [
        migrations.CreateModel(
            name='OpenedApp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
