from django.urls import path
from myCost import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('addCost/', views.addCost.as_view()),
]