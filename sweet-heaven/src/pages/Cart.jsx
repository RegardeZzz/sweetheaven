import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartApi from "../api/cartApi";

const MEDIA_URL = "http://localhost:8000"; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token] = useState(localStorage.getItem("access"));

  useEffect(() => {
    if (token) {
      cartApi.getCart(token)
        .then((res) => setCartItems(res.data.items))
        .catch(console.error);
    }
  }, [token]);

  const incrementQuantity = async (id) => {
    const item = cartItems.find(i => i.id === id);
    await cartApi.updateItem(token, id, item.quantity + 1);
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decrementQuantity = async (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item.quantity > 1) {
      await cartApi.updateItem(token, id, item.quantity - 1);
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
    }
  };

  const removeItem = async (id) => {
    await cartApi.deleteItem(token, id);
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2000 ? 0 : 200;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Корзина</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl text-gray-400 mb-4"></div>
            <h2 className="text-2xl font-semibold mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-500 mb-8">Вы ещё не добавили товары</p>
            <Link to="/catalog" className="bg-primary text-white h-10 px-4 py-2 rounded-lg">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b pb-4"
                  >
                    <div className="flex gap-4 w-full">
                      <img
                        src={`${MEDIA_URL}${item.product.image}`}
                        alt={item.product.name}
                        className="h-24 w-24 rounded-md object-cover shrink-0"
                      />
                      <div className="flex flex-col justify-between w-full">
                        <div className="mb-2">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-medium text-base hover:text-primary"
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-primary text-sm">{item.product.price} ₽</div>
                        </div>
                        <div className="flex items-center border rounded-md w-fit">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="h-9 w-9 text-xl"
                          >
                            −
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="h-9 w-9 text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full sm:w-auto sm:ml-auto mt-4 sm:mt-0">
                      <div className="font-semibold text-right">{item.product.price * item.quantity} ₽</div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-lg ml-4"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Сумма заказа</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Подытог</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span>{deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>Итого</span>
                    <span>{total} ₽</span>
                  </div>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded mt-6">
                  Оформить заказ
                </button>
                <Link to="/catalog" className="block text-center mt-3 underline">
                  Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
