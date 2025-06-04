from django.urls import path
from .views import get_cart, add_to_cart, update_cart_item, delete_cart_item

urlpatterns = [
    path('', get_cart, name='get-cart'),
    path('add/', add_to_cart, name='add-to-cart'),
    path('update/<int:item_id>/', update_cart_item, name='update-cart-item'),
    path('delete/<int:item_id>/', delete_cart_item, name='delete-cart-item'),
]
