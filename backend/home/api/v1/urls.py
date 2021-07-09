from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    HomePageViewSet,
    CustomTextViewSet,
    WeightViewSet,
    BloodPressureViewSet,
    BloodSugarViewSet,
    VegetablesAndFruitsViewSet,
    WaterViewSet
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("customtext", CustomTextViewSet)
router.register("homepage", HomePageViewSet)
router.register("weight", WeightViewSet)
router.register("blood-pressure", BloodPressureViewSet)
router.register("blood-sugar", BloodSugarViewSet)
router.register("vegetables-fruits", VegetablesAndFruitsViewSet)
router.register("water", WaterViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
