from django.urls import path
from myCost import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('totalCostPerYear/<str:year>/', views.TotalCostPerYear.as_view())
]