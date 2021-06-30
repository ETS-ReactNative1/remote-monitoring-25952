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
    BloodPressureSerializer
)
from home.models import CustomText, HomePage, Weight, BloodPressure


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
