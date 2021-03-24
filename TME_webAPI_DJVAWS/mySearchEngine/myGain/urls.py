from django.urls import path
from myGain import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('totalGainForYear/<str:year>/', views.TotalGainForYear.as_view()),
    path('mostSale/<str:year>', views.TheMostSaleForYear.as_view()),
    path('impot/', views.Impot.as_view()),
    path('test/', views.Test.as_view()),
    path('allGainPerMonthForYear/<str:year>/',views.AllGainPerMonthForYear.as_view()),
    path('allGainPerDayForAYear/<str:year>/<str:month>',views.AllGainPerDayForAYear.as_view())

]