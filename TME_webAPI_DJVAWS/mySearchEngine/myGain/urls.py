from django.urls import path
from myGain import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('totalGainPerYear/<int:year>/', views.TotalGainPerYear.as_view()),
    path('mostSale/', views.TheMostSaleForYear.as_view()),
    path('impot/', views.Impot.as_view()),
    path('test/', views.Test.as_view())

]