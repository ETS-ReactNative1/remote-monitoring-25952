from django.db import models

# Create your models here.

from django.db import models


class CustomText(models.Model):
    """
    Boilerplate model to populate the index homepage to demonstrate that the app was
    successfuly built. All references to it should be removed in order to remove this
    app from the project.
    """

    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title

    @property
    def api(self):
        return f'/api/v1/customtext/{self.id}/'

    @property
    def field(self):
        return 'title'


class HomePage(models.Model):
    """
    Boilerplate model to populate the index homepage to demonstrate that the app was
    successfuly built. All references to it should be removed in order to remove this
    app from the project.
    """
    body = models.TextField()

    @property
    def api(self):
        return f'/api/v1/homepage/{self.id}/'

    @property
    def field(self):
        return 'body'

class Weight(models.Model):
    user_id = models.IntegerField()
    weight = models.CharField(max_length=3)
    timestamp = models.DateTimeField(auto_now_add= True)


class BloodPressure(models.Model):
    user_id = models.IntegerField()
    systolic = models.CharField(max_length=3)
    diastolic = models.CharField(max_length=3)
    timestamp = models.DateTimeField(auto_now_add= True)

class BloodSugar(models.Model):
    user_id = models.IntegerField()
    blood_sugar = models.CharField(max_length=3)
    timestamp = models.DateTimeField(auto_now_add= True)

class VegetablesAndFruits(models.Model):
    user_id = models.IntegerField()
    vegetables = models.CharField(max_length=3)
    fruits = models.CharField(max_length=3)
    timestamp = models.DateTimeField(auto_now_add= True)

class Water(models.Model):
    user_id = models.IntegerField()
    water = models.CharField(max_length=3)
    timestamp = models.DateTimeField(auto_now_add= True)

class Steps(models.Model):
    user_id = models.IntegerField()
    steps = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add= True)

class Height(models.Model):
    user_id = models.IntegerField()
    height = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add= True)