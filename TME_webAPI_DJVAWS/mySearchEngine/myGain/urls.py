from django.urls import path
from myGain import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('totalGainPerYear/<int:year>/', views.TotalGainPerYear.as_view()),
    path('mostSale/', views.TheMostSale.as_view())
]