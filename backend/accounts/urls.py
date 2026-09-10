from django.urls import path

from .views import LoginView, RegisterView, UpdateProfileView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='account-register'),
    path('auth/login/', LoginView.as_view(), name='account-login'),
    path('user/update_profile/', UpdateProfileView.as_view(), name='account-update-profile'),
]