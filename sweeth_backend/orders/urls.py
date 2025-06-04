# orders/urls.py
from django.urls import path
from .views import create_order, list_orders

urlpatterns = [
    path('create/', create_order, name='create-order'),
    path('list/', list_orders, name='list-orders'),
]
