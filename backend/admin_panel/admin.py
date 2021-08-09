from django.http import HttpResponse
from django.contrib.admin import AdminSite
from django.template.response import TemplateResponse
from django.urls import path, reverse
from .models import AdminPanel
from home.models import UserInformation
import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging
from remote_monitoring_25952 import settings
import os

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

        return TemplateResponse(request, "alerts.html", context)
    
    def reports(self, request):
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
        context['users'] = users
        
        return TemplateResponse(request, "shippment.html", context)
    
    def shippment_csv(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        users = UserInformation.objects.all()

        data = "User, Address, City, Zipcode,"
        for e in users:
            data += "\n{} {}, {}, {}, {}".format(e.first_name, e.last_name, e.address, e.city, e.zip_code)

        response = HttpResponse (data, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'
        
        return response
    
    def report_template(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        user_informations = UserInformation.objects.get(user_id=request.GET['id'])
        context['user_informations'] = user_informations
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
            cred = credentials.Certificate(os.path.join(settings.BASE_DIR, 'firebase_admin.json'))
            firebase_admin.initialize_app(cred)

            fcm = UserInformation.objects.get(user_id=request.POST['user_id']).fcm

            message = messaging.Message(
                notification=messaging.Notification(
                    title=request.POST['title'],
                    body=request.POST['message'],
                ),
                token=fcm,
            )
            
            response = messaging.send(message)
            
            print(response)

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
admin_site.register(UserInformation)