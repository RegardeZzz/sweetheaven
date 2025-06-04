from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductSerializer (serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'description']

class ProductSerializer(serializers.ModelSerializer):
    category_slug = serializers.SlugRelatedField(
        source='category',
        slug_field='slug',
        read_only=True
    )

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'description','short_description', 'category_slug', 'composition', 'nutrition',
                  'weight_grams', 'shelf_life_days', 'semi_finished_hours']
