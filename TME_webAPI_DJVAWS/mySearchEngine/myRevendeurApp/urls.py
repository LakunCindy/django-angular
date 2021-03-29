from django.urls import path
from myRevendeurApp import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('infoproducts/', views.InfoStockProducts.as_view()),
    path('infoproduct/<int:pk>/', views.InfoStockProductDetail.as_view()),
    path('incrementStock/<int:id>/<int:number>/<int:totalPrice>/', views.IncrementStock.as_view()),
    path('decrementStock/<int:id>/<int:number>/<int:totalPrice>/<str:category>', views.DecrementStock.as_view()),
    # path('updateStock/<dict:newStock>', views.UpdateStock.as_view()),
    path('updateQuantity/<int:id>/<int:new_quantity>/',views.UpdateQuantity.as_view())
]       