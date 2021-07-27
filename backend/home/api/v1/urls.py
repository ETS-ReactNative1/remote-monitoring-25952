from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    UserRegister,
    UserLogin,
    HomePageViewSet,
    CustomTextViewSet,
    WeightViewSet,
    BloodPressureViewSet,
    BloodSugarViewSet,
    VegetablesAndFruitsViewSet,
    WaterViewSet,
    StepsViewSet,
    BMIViewSet,
    HeightViewSet,
    UserStatusViewSet,
    UserInformationViewSet
)

router = DefaultRouter()
router.register("customtext", CustomTextViewSet)
router.register("homepage", HomePageViewSet)
router.register("weight", WeightViewSet)
router.register("blood-pressure", BloodPressureViewSet)
router.register("blood-sugar", BloodSugarViewSet)
router.register("vegetables-fruits", VegetablesAndFruitsViewSet)
router.register("water", WaterViewSet)
router.register("steps", StepsViewSet)
router.register("bmi", BMIViewSet)
router.register("height", HeightViewSet)
router.register("user-status", UserStatusViewSet)
router.register("user-information", UserInformationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('auth/register/', UserRegister.as_view()),
    path('auth/login/', UserLogin.as_view()),
]
