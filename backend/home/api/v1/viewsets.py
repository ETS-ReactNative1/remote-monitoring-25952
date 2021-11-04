from rest_framework import viewsets, generics, permissions
from django.contrib.auth import authenticate
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from home.backends import get_user_id
from home.api.v1.serializers import (
    SignupSerializer,
    LoginSerializer,
    CustomTextSerializer,
    HomePageSerializer,
    UserSerializer,
    WeightSerializer,
    BloodPressureSerializer,
    BloodSugarSerializer,
    VegetablesAndFruitsSerializer,
    WaterSerializer,
    StepsSerializer,
    HeightSerializer,
    UserInformationSerializer,
    OpenedAppSerializer
)
from home.models import CustomText, HomePage, Weight, BloodPressure, BloodSugar, VegetablesAndFruits, Water, Steps, Height, OpenedApp, UserInformation

from datetime import datetime

# USER REGISTER
class UserRegister(generics.GenericAPIView):
  serializer_class = SignupSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token, created = Token.objects.get_or_create(user=user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token.key
    })

# USER LOGIN
class UserLogin(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    token, created = Token.objects.get_or_create(user=user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token.key
    })

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]

class WeightViewSet(ViewSet):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = Weight.objects.filter(user_id=user_id)
        serializer = WeightSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        
        if user_id:
            entry = Weight(user_id=user_id, weight=request.data['weight'])
            entry.save()
        return Response({'status': user_id})


class BloodPressureViewSet(ViewSet):
    queryset = BloodPressure.objects.all()
    serializer_class = BloodPressureSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = BloodPressure.objects.filter(user_id=user_id)
        serializer = BloodPressureSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        
        if user_id:
            entry = BloodPressure(user_id=user_id, systolic=request.data['systolic'], diastolic=request.data['diastolic'])
            entry.save()
        return Response({'status': user_id})

class BloodSugarViewSet(ViewSet):
    queryset = BloodSugar.objects.all()
    serializer_class = BloodSugarSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = BloodSugar.objects.filter(user_id=user_id)
        serializer = BloodSugarSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        
        if user_id:
            entry = BloodSugar(user_id=user_id, blood_sugar=request.data['blood_sugar'])
            entry.save()
        return Response({'status': user_id})

class VegetablesAndFruitsViewSet(ViewSet):
    queryset = VegetablesAndFruits.objects.all()
    serializer_class = VegetablesAndFruitsSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = VegetablesAndFruits.objects.filter(user_id=user_id)
        serializer = VegetablesAndFruitsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        
        if user_id:
            entry = VegetablesAndFruits(user_id=user_id, vegetables=request.data['vegetables'], fruits=request.data['fruits'])
            entry.save()
        return Response({'status': user_id})

class WaterViewSet(ViewSet):
    queryset = Water.objects.all()
    serializer_class = WaterSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = Water.objects.filter(user_id=user_id)
        serializer = WaterSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        
        if user_id:
            entry = Water(user_id=user_id, water=request.data['water'])
            entry.save()
        return Response({'status': user_id})


class StepsViewSet(ViewSet):
    queryset = Steps.objects.all()
    serializer_class = StepsSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = Steps.objects.filter(user_id=user_id)
        serializer = StepsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        
        if user_id:
            entry = Steps(user_id=user_id, steps=request.data['steps'])
            entry.save()
        return Response({'status': user_id})

class BMIViewSet(ViewSet):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        latest_weight = Weight.objects.filter(user_id=user_id)
        latest_weight = latest_weight[-1]

        return Response({'BMI': latest_weight/request.data['height']**2})

class HeightViewSet(ViewSet):
    queryset = Height.objects.all()
    serializer_class = HeightSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = Height.objects.filter(user_id=user_id)
        serializer =HeightSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        
        if user_id:
            entry = Height(user_id=user_id, height=request.data['height'])
            entry.save()
        return Response({'status': user_id})


class UserStatusViewSet(ViewSet):
    queryset = Height.objects.all()
    serializer_class = HeightSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)

        return Response({'status': user_id})
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        user = UserInformation.objects.get(user_id=user_id)
        user.last_login_timestamp = datetime.now()
        user.save()
        entry_open = OpenedApp(user_id=int(user_id))
        entry_open.save()

        return Response({'status': user_id})

class UserStatusDebugViewSet(ViewSet):
    queryset = Height.objects.all()
    serializer_class = HeightSerializer
    permission_classes = [AllowAny]
    def list(self, request):
        #user_id, user_data = get_user_id(request)

        open_apps = OpenedApp.objects.filter(user_id=request.data['user_id'])
        users = UserInformation.objects.all()
        serializer_users = UserInformationSerializer(users, many=True)
        serializer_opens = OpenedAppSerializer(open_apps, many=True)
        return Response({'data_users': serializer_users.data, 'data_opens': serializer_opens.data})

class UserInformationViewSet(ViewSet):
    queryset = UserInformation.objects.all()
    serializer_class = UserInformationSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = UserInformation.objects.filter(user_id=user_id)
        serializer = UserInformationSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        if user_id:
            entry = UserInformation(user_id=user_id, operating_system=request.data['operating_system'], browser_version=request.data['browser_version'], device=request.data['device'], fcm=request.data['fcm'])
            entry.save()
        return Response({'status': user_id})


class UserInformationViewSet(ViewSet):
    queryset = UserInformation.objects.all()
    serializer_class = UserInformationSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)
        queryset = UserInformation.objects.filter(user_id=user_id)
        serializer = UserInformationSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        print("USER INFO CREATE WAS CALLED***")
        user_id, user_data = get_user_id(request)
        if user_id:
            users = UserInformation.objects.filter(user_id=user_id)
            users_count = UserInformation.objects.filter(user_id=user_id).count()
            if len(users) == 0:
                entry = UserInformation(user_id=user_id, operating_system=request.data['operating_system'], browser_version=request.data['browser_version'], device=request.data['device'], fcm=request.data['fcm'])
                entry.first_name = user_data['first_name']
                entry.last_name = user_data['last_name']
                entry.dob = user_data['DOB']
                entry.address = user_data['address']
                entry.city = user_data['city']
                entry.zip_code = user_data['zip_code']
                entry.save()
            else:
                entry = users[0]
                entry.operating_system = request.data['operating_system']
                entry.browser_version = request.data['browser_version']
                entry.device = request.data['device']
                entry.fcm = request.data['fcm']
                entry.save()
        return Response({'status': user_id})


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = UserInformation.objects.all()
    serializer_class = UserInformationSerializer
    

    @action(methods=['POST'], detail=True)
    def mail_provider(self, request, pk=None):
        ''' will send email to the selected provider '''
        user = get_object_or_404(UserInformation, id=pk)
        response = user.send_doctor_email()
        return Response(response)


class UserStateViewSet(ViewSet):
    queryset = Height.objects.all()
    serializer_class = HeightSerializer
    
    def list(self, request):
        user_id, user_data = get_user_id(request)

        return Response({'status': user_id})
    
    def create(self, request):
        user_id, user_data = get_user_id(request)
        user = UserInformation.objects.get(user_id=user_id)
        user.state = request.data['state']
        user.save()

        return Response({'status': user_id})
