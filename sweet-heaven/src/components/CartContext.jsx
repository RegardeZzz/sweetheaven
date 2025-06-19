
import React, { createContext, useState, useEffect } from 'react';
import cartApi from '../api/cartApi';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('access');

  // Загружаем корзину один раз при входе
  useEffect(() => {
    if (token) {
      cartApi.getCart(token)
        .then((res) => setCartItems(res.data.items || []))
        .catch(() => setCartItems([]));
    }
  }, [token]);

  // Вычисляем общее кол-во товаров
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Добавляем товар в корзину: отправляем на сервер и обновляем локально
  const addToCart = async (productId, quantity = 1) => {
    if (!token) return;

    try {
      const response = await cartApi.addItem(token, productId, quantity);
      const updatedItem = response.data;

      const exists = cartItems.find(item => item.id === updatedItem.id);
      let updatedCart;

      if (exists) {
        updatedCart = cartItems.map(item =>
          item.id === updatedItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...cartItems, updatedItem];
      }

      setCartItems(updatedCart);
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
