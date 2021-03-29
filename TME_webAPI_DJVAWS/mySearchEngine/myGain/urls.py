from django.urls import path
from myGain import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('totalGainForYear/<str:year>/', views.TotalGainForYear.as_view()),
    path('totalGainForMonth/<str:year>/<str:month>', views.TotalGainForMonth.as_view()),
    path('mostSale/<str:year>', views.TheMostSaleForYear.as_view()),
    path('impot/<str:year>', views.Impot.as_view()),
    path('test/', views.Test.as_view()),
    path('allGainPerMonthForYear/<str:year>/<str:category>',views.AllGainPerMonthForYear.as_view()),
    path('allGainPerDayForAMonth/<str:year>/<str:month>/<str:category>',views.AllGainPerDayForAMonth.as_view())

]