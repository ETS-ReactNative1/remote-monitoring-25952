from django.http import HttpResponse
from django.contrib.admin import AdminSite
from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path, reverse
from django.db.models import Q
from .models import AdminPanel
from home.models import Hospital, Doctor, Weight, Steps, OpenedApp, BloodPressure, BloodSugar, VegetablesAndFruits, Water, Height
from home.models import UserInformation
import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging
from remote_monitoring_25952 import settings
import os

from django.utils import timezone as django_tz
import datetime
import pytz

utc=pytz.UTC

class MyAdminSite(AdminSite):
    site_header = 'Admin Dashboard'
    site_title = 'Dashboard'

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('user_infos/', self.admin_view(self.reports), name='reports'),
            path('reports/', self.admin_view(self.reports), name='reports'),
            path('shipping/', self.admin_view(self.shippment), name='reports'),
            path('shipping/export/', self.admin_view(self.shippment_csv), name='shippingexport'),
            path('alerts/', self.admin_view(self.alerts), name='reports'),
            path('reports/download/', self.admin_view(self.report_template), name='reports'),
            path('push-notifications/', self.admin_view(self.push_notifications), name='reports'),
        ]
        print(my_urls + urls)
        return my_urls + urls

    def alerts(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        today = datetime.datetime.today() - datetime.timedelta(days=3)
        users = UserInformation.objects.filter(Q(last_login_timestamp__lt=today)|Q(last_login_timestamp=None))
        
        for e in users:
            print(e)
            print(e.last_login_timestamp)
        
        context['users'] = users

        return TemplateResponse(request, "alerts.html", context)
    
    def reports(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        users = UserInformation.objects.all().order_by('first_name')
        if request.method == "POST":
            if request.POST['user_id']:
                user = UserInformation.objects.get(user_id=request.POST['user_id'])
                response = user.send_doctor_email()
                context['sent'] = True
                context['sent_msg'] = response
            else:
                try:
                    users = UserInformation.objects.filter(first_name__contains=request.POST['search'].split(' ')[0], last_name__contains=request.POST['search'].split(' ')[1]).order_by('first_name')
                except:
                    users = UserInformation.objects.filter(first_name__contains=request.POST['search'].split(' ')[0]).order_by('first_name')
        context['users'] = users
        
        return TemplateResponse(request, "reports.html", context)
    
    def shippment(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        users = UserInformation.objects.all().order_by('first_name')
        
        if request.method == "POST":
            try:
                users = UserInformation.objects.filter(first_name__contains=request.POST['search'].split(' ')[0], last_name__contains=request.POST['search'].split(' ')[1]).order_by('first_name')
            except:
                users = UserInformation.objects.filter(first_name__contains=request.POST['search'].split(' ')[0]).order_by('first_name')
            
            # FILTER BY DATE
            try:
                start_date = datetime.datetime.strptime(request.POST['start_date'], '%Y-%m-%d')
                #users.filter(Q(date_joined__gte=request.POST['start_date']))
                filtered_users = []
                for e in users:
                    if e.date_joined > utc.localize(start_date):
                        filtered_users.append(e)
                
                users = filtered_users
            
            except Exception as e:
                print(e)
                print('nothing parsed')
            
            try:
                end_date = datetime.datetime.strptime(request.POST['end_date'], '%Y-%m-%d')
                #users.filter(Q(date_joined__lt=request.POST['end_date']))
                filtered_users = []
                for e in users:
                    if e.date_joined < utc.localize(end_date):
                        filtered_users.append(e)
                
                users = filtered_users
            except Exception as e:
                print(e)
                print('nothing parsed')
        
        context['users'] = users
        
        return TemplateResponse(request, "shippment.html", context)
    
    def shippment_csv(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        users = UserInformation.objects.all()

        data = "User, Address, State, City, Zipcode, Date joined"
        for e in users:
            data += "\n{} {}, {}, {}, {}, {}".format(e.first_name, e.last_name, e.address, e.state, e.city, e.zip_code, e.date_joined)

        response = HttpResponse (data, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'
        
        return response
    
    def report_template(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        this_month = django_tz.now().month
        last_month = this_month - 1
        if last_month == 0:
            last_month = 12
        this_month = str(this_month)
        last_month = str(last_month)

        print("This month is: ", this_month)
        print("Last month is: ", last_month)
        today = datetime.datetime.today()
        month_ago = datetime.datetime.today() - datetime.timedelta(days=30)
        date_generate_report = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=5)
        context['date_generate_report'] = date_generate_report

        user_informations = UserInformation.objects.get(user_id=request.GET['id'])
        context['user_informations'] = user_informations
        weights = Weight.objects.filter(user_id=user_informations.user_id).filter(Q(timestamp__gt=month_ago) and Q(timestamp__lt=today))
        weight_labels = []
        weight_data = []
        for e in weights:
            weight_labels.append(e.timestamp)
            weight_data.append(e.weight)
        
        context['weight_data'] = weight_data
        context['weight_labels'] = weight_labels

        steps = Steps.objects.filter(user_id=user_informations.user_id).filter(Q(timestamp__gt=month_ago) and Q(timestamp__lt=today))
        steps_labels = []
        steps_data = []
        for e in steps:
            steps_labels.append(e.timestamp)
            steps_data.append(e.steps)
        
        context['steps_data'] = steps_data
        context['steps_labels'] = steps_labels

        # BMI
        try:
            height = Height.objects.filter(user_id=user_informations.user_id).order_by('id')[0]
            height_parts = height.height.split('.')
            height = int(height_parts[0])*12+int(height_parts[1])
            weight = Weight.objects.filter(user_id=user_informations.user_id).order_by('id')[0]
            weight = int(weight.weight)
            context['bmi'] = int((weight/height/height)*703)
        except:
            context['bmi'] = 0
        # TIMES OPENED APP
        times_op = OpenedApp.objects.filter(user_id=user_informations.user_id).count()
        context['times_op'] = times_op

        # TIMES OPENED APP LAST MONTH
        times_op_lm = OpenedApp.objects.filter(user_id=user_informations.user_id, timestamp__month=last_month).count()
        context['times_op_lm'] = times_op_lm

        # TIMES STEPPED ON SCALE
        times_stepped_scale = Weight.objects.filter(user_id=user_informations.user_id).count()
        context['times_stepped_scale'] = times_stepped_scale

        # LAST WEIGHT, LAST MONTH
        try:
            weight = Weight.objects.filter(user_id=user_informations.user_id).order_by('id')[0]
            context['lastest_weight'] = weight.weight
        except:
            context['lastest_weight'] = 'not taken'
        # HIGHEST BLOOD PRESSURE
        try:
            highest_bp = BloodPressure.objects.filter(user_id=user_informations.user_id).order_by('systolic')[0]
            context['highest_bp'] = f"{highest_bp.systolic}/{highest_bp.diastolic}"
        except:
            context['highest_bp'] = 'not taken'

        # LOWEST BLOOD PRESSURE
        try:
            lowest_bp = BloodPressure.objects.filter(user_id=user_informations.user_id).order_by('systolic')[-1]
            context['lowest_bp'] = f"{lowest_bp.systolic}/{lowest_bp.diastolic}"
        except:
            context['lowest_bp'] = 'not taken'

        # HIGHEST BLOOD SUGAR
        try:
            highest_bs = BloodSugar.objects.filter(user_id=user_informations.user_id).order_by('blood_sugar')[0]
            context['highest_bs'] = highest_bs.blood_sugar
        except:
            context['highest_bs'] = 'not taken'

        # LOWEST BLOOD SUGAR
        try:
            lowest_bs = BloodPressure.objects.filter(user_id=user_informations.user_id).order_by('blood_sugar')[-1]
            context['lowest_bs'] = lowest_bs.blood_sugar
        except:
            context['lowest_bs'] = 'not taken'

        # AVERAGE DAILY STEP COUNT
        try:
            steps_taken = Steps.objects.filter(user_id=user_informations.user_id)
            all_steps = 0
            for e in steps_taken:
                all_steps = all_steps + int(e.steps)
            context['steps_average'] = int(all_steps/steps_taken.count())
        except Exception as e:
            context['steps_average'] = str(e)

        # WATER INTAKE SERVINGS
        try:
            water_intake = Water.objects.filter(user_id=user_informations.user_id).order_by('timestamp')[0]
            context['water_intake'] = water_intake.water
        except Exception as e:
            context['water_intake'] = 0

        # FRUIT/VEGGIES INTAKE SERVINGS
        try:
            fv_intake = VegetablesAndFruits.objects.filter(user_id=user_informations.user_id).order_by('timestamp')[0]
            context['fv_intake'] = int(fv_intake.fruits)+int(fv_intake.vegetables)
        except Exception as e:
            context['fv_intake'] = e
        

        
        # daily average water intake
        try:
            water_intake_avg_last_month_list = Water.objects.filter(user_id=user_informations.user_id, timestamp__month=last_month)
            water_intake_avg_this_month_list = Water.objects.filter(user_id=user_informations.user_id, timestamp__month=this_month)
            water_intake_avg_this_month = 0
            water_intake_avg_last_month = 0
            for e in water_intake_avg_last_month_list:
                water_intake_avg_last_month += int(e.water)
            
            if len(water_intake_avg_last_month_list):
                water_intake_avg_last_month = water_intake_avg_last_month / len(water_intake_avg_last_month_list)
            
            for e in water_intake_avg_this_month_list:
                water_intake_avg_this_month += int(e.water)
            
            if len(water_intake_avg_this_month_list):
                water_intake_avg_this_month = water_intake_avg_this_month / len(water_intake_avg_this_month_list)
            
            context['water_intake_avg_this_month'] = int(water_intake_avg_this_month)*10
            context['water_intake_avg_last_month'] = int(water_intake_avg_last_month)*10
        except Exception as e:
            context['water_intake_avg_this_month'] = 0
            context['water_intake_avg_last_month'] = 0

        # daily average veggie intake
        try:
            veggie_intake_avg_last_month_list = VegetablesAndFruits.objects.filter(user_id=user_informations.user_id, timestamp__month=last_month)
            veggie_intake_avg_this_month_list = VegetablesAndFruits.objects.filter(user_id=user_informations.user_id, timestamp__month=this_month)
            
            veggie_intake_avg_this_month = 0
            veggie_intake_avg_last_month = 0
            
            for e in veggie_intake_avg_last_month_list:
                veggie_intake_avg_last_month += int(e.vegetables)
            
            if len(veggie_intake_avg_last_month_list):
                veggie_intake_avg_last_month = veggie_intake_avg_last_month / len(veggie_intake_avg_last_month_list)
            
            for e in veggie_intake_avg_this_month_list:
                veggie_intake_avg_this_month += int(e.vegetables)
            
            if len(veggie_intake_avg_this_month_list):
                veggie_intake_avg_this_month = veggie_intake_avg_this_month / len(veggie_intake_avg_this_month_list)
            
            context['veggie_intake_avg_this_month'] = "{:.2f}".format(veggie_intake_avg_this_month)
            context['veggie_intake_avg_last_month'] = "{:.2f}".format(veggie_intake_avg_last_month)
        except Exception as e:
            context['veggie_intake_avg_this_month'] = 0
            context['veggie_intake_avg_last_month'] = 0
        
        # daily average fruit intake
        try:
            fruit_intake_avg_last_month_list = VegetablesAndFruits.objects.filter(user_id=user_informations.user_id, timestamp__month=last_month)
            fruit_intake_avg_this_month_list = VegetablesAndFruits.objects.filter(user_id=user_informations.user_id, timestamp__month=this_month)
            
            fruit_intake_avg_this_month = 0
            fruit_intake_avg_last_month = 0
            
            for e in fruit_intake_avg_last_month_list:
                fruit_intake_avg_last_month += int(e.fruits)
            
            if len(fruit_intake_avg_last_month_list):
                fruit_intake_avg_last_month = fruit_intake_avg_last_month / len(fruit_intake_avg_last_month_list)
            
            for e in fruit_intake_avg_this_month_list:
                fruit_intake_avg_this_month += int(e.fruits)
            
            if len(fruit_intake_avg_this_month_list):
                fruit_intake_avg_this_month = fruit_intake_avg_this_month / len(fruit_intake_avg_this_month_list)
            
            context['fruit_intake_avg_this_month'] = "{:.2f}".format(fruit_intake_avg_this_month)
            context['fruit_intake_avg_last_month'] = "{:.2f}".format(fruit_intake_avg_last_month)
        except Exception as e:
            context['fruit_intake_avg_this_month'] = 0
            context['fruit_intake_avg_last_month'] = 0

        # most recent blood pressure
        try:
            most_recent_bs = BloodPressure.objects.filter(user_id=user_informations.user_id).order_by('timestamp')[0]
            context['most_recent_bs'] = "{}/{}".format(most_recent_bs.systolic, most_recent_bs.diastolic)
        except:
            context['most_recent_bs'] = 'not taken'
        # most recent blood sugar
        try:
            most_recent_bsu = BloodSugar.objects.filter(user_id=user_informations.user_id).order_by('blood_sugar')[0]
            context['most_recent_bsu'] = most_recent_bsu.blood_sugar
        except:
            context['most_recent_bsu'] = 'not taken'
        # average 30 day blood sugar
        try:
            avg_bsu_this_month_list = BloodSugar.objects.filter(user_id=user_informations.user_id, timestamp__month=this_month)
            avg_bsu_this_month = 0
            
            for e in avg_bsu_this_month_list:
                avg_bsu_this_month += int(e.blood_sugar)
            
            avg_bsu_this_month = avg_bsu_this_month / len(avg_bsu_this_month_list)
            
            context['avg_bsu_this_month'] = avg_bsu_this_month
        except:
            context['avg_bsu_this_month'] = 'not taken'
        
        # blood sugar readings taken in 30 day
        
        return TemplateResponse(request, "reports/report.html", context)
    
    def push_notifications(self, request):
        request.current_app = self.name
        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )

        users = UserInformation.objects.all().order_by('first_name')
        context['users'] = users
        
        if request.method == "POST":
            if not firebase_admin._apps:
                cred = credentials.Certificate(os.path.join(settings.BASE_DIR, 'firebase_admin.json'))
                firebase_admin.initialize_app(cred)


            try:
                fcm = UserInformation.objects.get(pk=request.POST['user_id']).fcm

                message = messaging.Message(
                    notification=messaging.Notification(
                        title=request.POST['title'],
                        body=request.POST['message'],
                    ),
                    token=fcm,
                )
                
                response = messaging.send(message)
                print(response)
            except:
                try:
                    for user_id in request.POST.getlist('user_id'):
                        fcm = UserInformation.objects.get(pk=user_id).fcm

                        message = messaging.Message(
                            notification=messaging.Notification(
                            title=request.POST['title'],
                            body=request.POST['message'],
                            ),
                            token=fcm,
                        )

                        response = messaging.send(message)
                except:
                    context["user_not_registered"] = 1

        

        return TemplateResponse(request, "push-notifications.html", context)

    def _build_app_dict(self, request, label=None):
        app_dict = {'admin_panel': {'name': 'Admin_Panel', 'app_label': 'admin_panel', 'app_url': '/admin/admin_panel/', 'has_module_perms': True, 'models': [{'name': 'Admin Panels', 'object_name': 'AdminPanel', 'perms': {'add': True, 'change': True, 'delete': True, 'view': True}, 'admin_url': '/admin/admin_panel/adminpanel/', 'add_url': '/admin/admin_panel/adminpanel/add/', 'view_only': False}]}}
        app_dict = {
            'dashboard': {
                'name': 'Dashboard',
                'app_label': 'dashboard',
                'app_url': '/admin/admin_panel/adminpanel/',
                'has_module_perms': True,
                'models': [
                    {
                        'name': 'Providers data for users',
                        'admin_url': '/admin/home/userinformation/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Shipping',
                        'admin_url': '/admin/shipping/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Push Notifications',
                        'admin_url': '/admin/push-notifications/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Reports',
                        'admin_url': '/admin/reports/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Alerts',
                        'admin_url': '/admin/alerts/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                ]
            }
        }
        #app_dict = super(MyAdminSite, self)._build_app_dict(request, label)
        return app_dict

admin_site = MyAdminSite(name='myadmin')

admin_site.register(AdminPanel)


class UserInformationAdmin(admin.ModelAdmin):
  list_display = ('id', 'first_name', 'last_name')

admin_site.register(UserInformation, UserInformationAdmin)

admin_site.register(Hospital)
admin_site.register(Doctor)