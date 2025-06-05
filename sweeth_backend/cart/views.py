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
    try:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart, context={"request": request})
        return Response(serializer.data)
    except Exception as e:
        print(f"[get_cart] Ошибка: {e}")
        return Response({"error": "Ошибка при загрузке корзины"}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    if not product_id:
        return Response({'error': 'Product ID обязателен'}, status=400)

    try:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product = Product.objects.get(id=product_id)
        item, _ = CartItem.objects.get_or_create(cart=cart, product=product)
        item.quantity = quantity
        item.save()
        return Response({'message': 'Товар добавлен в корзину'})
    except Product.DoesNotExist:
        return Response({'error': 'Продукт не найден'}, status=404)
    except Exception as e:
        print(f"[add_to_cart] Ошибка: {e}")
        return Response({'error': 'Ошибка сервера'}, status=500)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    try:
        quantity = int(request.data.get('quantity', 1))
        item = CartItem.objects.get(id=item_id, cart__user=request.user)
        item.quantity = quantity
        item.save()
        return Response({'message': 'Количество обновлено'})
    except CartItem.DoesNotExist:
        return Response({'error': 'Элемент не найден'}, status=404)
    except Exception as e:
        print(f"[update_cart_item] Ошибка: {e}")
        return Response({'error': 'Ошибка сервера'}, status=500)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, item_id):
    try:
        item = CartItem.objects.get(id=item_id, cart__user=request.user)
        item.delete()
        return Response({'message': 'Товар удалён'})
    except CartItem.DoesNotExist:
        return Response({'error': 'Элемент не найден'}, status=404)
    except Exception as e:
        print(f"[delete_cart_item] Ошибка: {e}")
        return Response({'error': 'Ошибка сервера'}, status=500)
