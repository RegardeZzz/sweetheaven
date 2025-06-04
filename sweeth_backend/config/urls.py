# Импорты
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter

#  Заменяем стандартную вьюху на кастомную
from accounts.views import (
    RegisterView, get_current_user, update_user, change_password,
    MyTokenObtainPairView  # <- вот это добавляем
)

from rest_framework_simplejwt.views import TokenRefreshView

from products.views import (
    ProductViewSet,
    CategoryViewSet,
    ProductsByCategoryView,
    ProductDetailView
)



#  Роутеры
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)

# URL-паттерны
urlpatterns = [
    path('admin/', admin.site.urls),

    # Основной API
    path('api/', include(router.urls)),

    # Категории
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/category/<slug:category_slug>/', ProductsByCategoryView.as_view(), name='products-by-category'),
    path('api/products/category/<slug:category_slug>/', ProductsByCategoryView.as_view(), name='products-by-category'),

    # Аутентификация
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # 👈 кастомный login по email
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/me/', get_current_user, name='get-current-user'),
    path('api/me/update/', update_user, name='update-user'),
    path('api/me/change-password/', change_password, name='change-password'),

    path('api/cart/', include('cart.urls')),

    # Обратная связь
    path('api/contact/', include('contacts.urls')),
    path('api/reviews/', include('reviews.urls')),

    path('api/orders/', include('orders.urls')),

]

# Статика
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
