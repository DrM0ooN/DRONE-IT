from django.urls import path

from .views import HubListView

urlpatterns = [
    path('hubs/', HubListView.as_view(), name='hub-list'),
]
