from rest_framework import serializers
from .models import CartItem, Cart
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image']

    def get_image(self, obj):
        return obj.image if obj.image else None

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']
    
    def get_user(self, obj):
        return obj.user.email if obj.user else None
