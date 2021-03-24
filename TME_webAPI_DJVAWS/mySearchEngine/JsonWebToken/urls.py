from django.urls import path
from JsonWebToken import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # Your URLs...
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('user/',views.User.as_view(), name='user'),
]