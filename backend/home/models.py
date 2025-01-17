from django.db import models

# Create your models here.

from django.db import models
from django.utils.timezone import now

from common.ishare import *

class Hospital(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name


class Doctor(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='doctors', null=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(verbose_name="Direct message address", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'

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
    height = models.CharField(max_length=8)
    timestamp = models.DateTimeField(auto_now_add= True)

class OpenedApp(models.Model):
    user_id = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add= True)

class UserInformation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, related_name='patients', null=True)
    user_id = models.IntegerField()
    first_name = models.CharField(max_length=64, default="", blank=True)
    last_name = models.CharField(max_length=64, default="", blank=True)
    dob = models.CharField(max_length=64, default="", blank=True)
    address = models.CharField(max_length=64, default="", blank=True, null=True)
    state = models.CharField(max_length=64, default="", blank=True, null=True)
    city = models.CharField(max_length=64, default="", blank=True, null=True)
    zip_code = models.CharField(max_length=64, default="", blank=True, null=True)
    operating_system = models.CharField(max_length=64)
    browser_version = models.CharField(max_length=64)
    device = models.CharField(max_length=64)
    fcm = models.TextField()
    last_login_timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    date_joined = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    def send_doctor_email(self):
        # Send doctor email - based on the decision tree
        context = {'user': self}

        html_file = 'reports/report.html'

        response = mail_provider_ishare(
            direct_address=ISHARE_ACCOUNT_EMAIL, password=ISHARE_ACCOUNT_PASSWORD, to=self.doctor.email, html_file=html_file)
        
        return response