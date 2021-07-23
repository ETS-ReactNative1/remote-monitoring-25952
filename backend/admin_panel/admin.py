from django.contrib.admin import AdminSite
from django.template.response import TemplateResponse
from django.urls import path, reverse
from .models import AdminPanel

class MyAdminSite(AdminSite):
    site_header = 'Admin Dashboard'
    site_title = 'Dashboard'

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('user_infos/', self.admin_view(self.stats), name='stats'),
        ]
        print(my_urls + urls)
        return my_urls + urls

    def stats(self, request):
        request.current_app = self.name

        context = dict(
           # Include common variables for rendering the admin template.
           self.each_context(request),
        )
        return TemplateResponse(request, "view_1.html", context)

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
                        'admin_url': '/admin/user_infos/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Analytics',
                        'admin_url': '/admin/user_infos/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Shipping',
                        'admin_url': '/admin/user_infos/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Push Notifications',
                        'admin_url': '/admin/user_infos/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Reports',
                        'admin_url': '/admin/user_infos/',
                        'object_name': 'User_Infos',
                        'perms': {'delete': False, 'add': False, 'change': False},
                        'add_url': ''
                    },
                    {
                        'name': 'Alerts',
                        'admin_url': '/admin/user_infos/',
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