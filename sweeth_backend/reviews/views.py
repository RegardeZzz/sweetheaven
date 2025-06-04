from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.generics import ListAPIView
from .models import Review
from .serializers import ReviewSerializer

class ProductReviewListView(ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return Review.objects.filter(product_id=product_id).order_by('-created_at')
