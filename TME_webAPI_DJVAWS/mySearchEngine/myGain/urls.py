from django.urls import path
from myGain import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('totalGainForYear/<str:year>/', views.TotalGainForYear.as_view()),
    path('mostSale/<str:year>', views.TheMostSaleForYear.as_view()),
    path('impot/<str:year>', views.Impot.as_view()),
    path('test/', views.Test.as_view()),
    path('allGainPerMonthForYear/<str:year>/',views.AllGainPerMonthForYear.as_view()),
    path('allGainPerDayForAMonth/<str:year>/<str:month>',views.AllGainPerDayForAMonth.as_view())

]