# reviews/urls.py
from django.urls import path
from .views import ProductReviewListView

urlpatterns = [
    path('<int:product_id>/', ProductReviewListView.as_view(), name='product-reviews'),
]
