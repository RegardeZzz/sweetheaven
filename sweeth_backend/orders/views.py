from django.shortcuts import render

# Create your views here.
# orders/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from cart.models import Cart, CartItem
from .serializers import OrderSerializer
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    cart = Cart.objects.get(user=user)
    cart_items = cart.items.select_related('product')

    if not cart_items:
        return Response({'error': 'Корзина пуста'}, status=400)

    total_price = sum(item.product.price * item.quantity for item in cart_items)

    order = Order.objects.create(user=user, total_price=Decimal(total_price))
    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart.items.all().delete()

    return Response(OrderSerializer(order).data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True, context={"request": request})
    return Response(serializer.data)
