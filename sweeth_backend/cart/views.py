from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Cart, CartItem
from products.models import Product
from .serializers import CartSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    if not product_id:
        return Response({'error': 'Product ID is required'}, status=400)

    cart, _ = Cart.objects.get_or_create(user=request.user)
    product = Product.objects.get(id=product_id)

    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    # ✅ Используй одно из двух:
    item.quantity = quantity  # если хочешь прибавлять
    # item.quantity = quantity  # если хочешь заменять

    item.save()
    return Response({'message': 'Товар добавлен в корзину'})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    quantity = int(request.data.get('quantity', 1))
    item = CartItem.objects.get(id=item_id, cart__user=request.user)
    item.quantity = quantity
    item.save()
    return Response({'message': 'Количество обновлено'})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, item_id):
    item = CartItem.objects.get(id=item_id, cart__user=request.user)
    item.delete()
    return Response({'message': 'Товар удалён'})
