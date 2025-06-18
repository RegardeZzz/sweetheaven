import React, { createContext, useState, useEffect } from 'react';
import cartApi from '../api/cartApi';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('access');

  useEffect(() => {
    if (token) {
      cartApi.getCart(token)
        .then((res) => {
          setCartItems(res.data.items || []);
        })
        .catch(() => {
          setCartItems([]);
        });
    }
  }, [token]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
