from django.urls import path
from myGain import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('addGain/', views.addGain.as_view()),
]