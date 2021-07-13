from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from home.backends import get_user_id
from home.api.v1.serializers import (
    SignupSerializer,
    CustomTextSerializer,
    HomePageSerializer,
    UserSerializer,
    WeightSerializer,
    BloodPressureSerializer,
    BloodSugarSerializer,
    VegetablesAndFruitsSerializer,
    WaterSerializer,
    StepsSerializer
)
from home.models import CustomText, HomePage, Weight, BloodPressure, BloodSugar, VegetablesAndFruits, Water, Steps


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
        user_id = get_user_id(request)
        queryset = Weight.objects.filter(user_id=user_id)
        serializer = WeightSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id = get_user_id(request)
        
        if user_id:
            entry = Weight(user_id=user_id, weight=request.data['weight'])
            entry.save()
        return Response({'status': user_id})


class BloodPressureViewSet(ViewSet):
    queryset = BloodPressure.objects.all()
    serializer_class = BloodPressureSerializer
    
    def list(self, request):
        user_id = get_user_id(request)
        queryset = BloodPressure.objects.filter(user_id=user_id)
        serializer = BloodPressureSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id = get_user_id(request)
        
        if user_id:
            entry = BloodPressure(user_id=user_id, systolic=request.data['systolic'], diastolic=request.data['diastolic'])
            entry.save()
        return Response({'status': user_id})

class BloodSugarViewSet(ViewSet):
    queryset = BloodSugar.objects.all()
    serializer_class = BloodSugarSerializer
    
    def list(self, request):
        user_id = get_user_id(request)
        queryset = BloodSugar.objects.filter(user_id=user_id)
        serializer = BloodSugarSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id = get_user_id(request)
        
        if user_id:
            entry = BloodSugar(user_id=user_id, blood_sugar=request.data['blood_sugar'])
            entry.save()
        return Response({'status': user_id})

class VegetablesAndFruitsViewSet(ViewSet):
    queryset = VegetablesAndFruits.objects.all()
    serializer_class = VegetablesAndFruitsSerializer
    
    def list(self, request):
        user_id = get_user_id(request)
        queryset = VegetablesAndFruits.objects.filter(user_id=user_id)
        serializer = VegetablesAndFruitsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id = get_user_id(request)
        
        if user_id:
            entry = VegetablesAndFruits(user_id=user_id, vegetables=request.data['vegetables'], fruits=request.data['fruits'])
            entry.save()
        return Response({'status': user_id})

class WaterViewSet(ViewSet):
    queryset = Water.objects.all()
    serializer_class = WaterSerializer
    
    def list(self, request):
        user_id = get_user_id(request)
        queryset = Water.objects.filter(user_id=user_id)
        serializer = WaterSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id = get_user_id(request)
        
        if user_id:
            entry = Water(user_id=user_id, water=request.data['water'])
            entry.save()
        return Response({'status': user_id})


class StepsViewSet(ViewSet):
    queryset = Steps.objects.all()
    serializer_class = StepsSerializer
    
    def list(self, request):
        user_id = get_user_id(request)
        queryset = Steps.objects.filter(user_id=user_id)
        serializer = StepsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user_id = get_user_id(request)
        
        if user_id:
            entry = Steps(user_id=user_id, steps=request.data['steps'])
            entry.save()
        return Response({'status': user_id})

class BMIViewSet(ViewSet):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    
    def create(self, request):
        user_id = get_user_id(request)
        latest_weight = Weight.objects.filter(user_id=user_id)
        latest_weight = latest_weight[-1]

        return Response({'BMI': latest_weight/request.data['height']**2})