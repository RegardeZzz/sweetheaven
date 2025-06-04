// Импорты
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../api/productApi';
import ProductCard from '../components/ProductCard';
import cartApi from '../api/cartApi';
import reviewApi from '../api/reviewApi'; // Импорт API для отзывов

const ProductDetails = () => {
  // Получаем id продукта из URL
  const { id } = useParams();

  // Состояния
  const [product, setProduct] = useState(null);           // Текущий товар
  const [loading, setLoading] = useState(true);           // Состояние загрузки
  const [error, setError] = useState(null);               // Ошибка загрузки
  const [activeTab, setActiveTab] = useState("description"); // Активная вкладка
  const [quantity, setQuantity] = useState(1);            // Кол-во товара
  const [relatedProducts, setRelatedProducts] = useState([]); // Похожие товары
  const [reviews, setReviews] = useState([]);             // Отзывы

  const token = localStorage.getItem("access");

  // Загрузка продукта
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productApi.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки продукта');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Загрузка отзывов по ID товара
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewApi.getReviews(id);
        setReviews(res.data);
      } catch (err) {
        console.error("Ошибка загрузки отзывов", err);
      }
    };
    fetchReviews();
  }, [id]);

  // Загрузка похожих товаров по категории
  useEffect(() => {
    if (product && product.category_slug) {
      const fetchRelated = async () => {
        try {
          const data = await productApi.getRelatedProducts(product.category_slug);
          const filtered = data.filter(p => p.id !== product.id).slice(0, 4);
          setRelatedProducts(filtered);
        } catch (err) {
          console.error('Ошибка загрузки похожих продуктов', err);
        }
      };
      fetchRelated();
    }
  }, [product]);

  // Изменение количества товара
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Если товар не найден или ошибка
  if (loading) return <div className="text-center p-10">Загрузка...</div>;
  if (error || !product) return <div className="text-center text-red-500 p-10">{error}</div>;

  // Добавление в корзину
  const handleAddToCart = async () => {
    try {
      if (!token) {
        alert("Сначала войдите в аккаунт");
        return;
      }
      await cartApi.addItem(token, product.id, quantity);
      alert("Товар добавлен в корзину 🛒");
    } catch (err) {
      console.error("Ошибка добавления в корзину", err);
      alert("Ошибка при добавлении в корзину");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Блок с основным товаром */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="rounded-lg overflow-hidden mb-6 w-full h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-display mb-2">{product.name}</h1>
            <div className="text-2xl font-semibold text-primary mb-4">
              {product.price} ₽
            </div>
            <p className="text-muted-foreground mb-6">{product.short_description}</p>

            {/* Количество товара */}
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Количество:</span>
              <div className="flex items-center border rounded-md">
                <button
                  className="hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Кнопка добавления в корзину */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                onClick={handleAddToCart}
              >
                Добавить в корзину
              </button>
            </div>

            {/* Информация о получении */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-display mb-2">Информация о получении</h3>
              <p className="text-sm">
                Забрать заказ можно в наших магазинах<br />
                После оформления заказа — мы уведомим, когда он будет готов к получению<br />
                Обычно подготовка занимает 1 день
              </p>
            </div>
          </div>
        </div>

        {/* Вкладки: описание, состав, отзывы */}
        <div className="mb-16">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${activeTab === "description" ? "bg-white text-black shadow-sm" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Описание
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${activeTab === "nutrition" ? "bg-white text-black shadow-sm" : ""}`}
              onClick={() => setActiveTab("nutrition")}
            >
              Состав и калории
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${activeTab === "reviews" ? "bg-white text-black shadow-sm" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Отзывы
            </button>
          </div>

          {/* Вкладка описание */}
          {activeTab === "description" && (
            <div className="mt-6 prose max-w-none">
              <p className="whitespace-pre-line">{product.description}</p>
              <ul className='mt-4 space-y-1 text-sm'>
                {product.weight_grams && <li><strong>Вес:</strong> {product.weight_grams} г</li>}
                {product.shelf_life_days && <li><strong>Срок хранения:</strong> {product.shelf_life_days} дней</li>}
                {product.semi_finished_hours && <li><strong>Полуфабрикаты:</strong> {product.semi_finished_hours} ч</li>}
              </ul>
            </div>
          )}

          {/* Вкладка состав */}
          {activeTab === "nutrition" && (
            <div className="mt-6 prose max-w-none">
              <p className='whitespace-pre-line'>
                <strong>Состав:</strong><br />
                {product.composition || 'Информация о составе недоступна'}
              </p>
              <p className="whitespace-pre-line mt-4">
                <strong>Калорийность:</strong><br />
                {product.nutrition || 'Информация о калориях недоступна'}
              </p>
            </div>
          )}

          {/* Вкладка отзывы */}
          {activeTab === "reviews" && (
            <div className="mt-6 space-y-6">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground">Отзывов пока нет</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{review.author}</h4>
                      <div className="flex text-yellow-500">{'★'.repeat(review.rating)}</div>
                    </div>
                    <p className="text-gray-500">{review.text}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Похожие товары */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Вам также может понравиться</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
