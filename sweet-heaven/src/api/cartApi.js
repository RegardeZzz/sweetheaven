import axios from "axios";

const BASE_URL = "https://sweeth-backend.onrender.com/api/cart/";

const cartApi = {
  getCart: (token) =>
    axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  addItem: (token, productId, quantity = 1) =>
    axios.post(
      `${BASE_URL}add/`,
      { product_id: productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  updateItem: (token, itemId, quantity) =>
    axios.put(
      `${BASE_URL}update/${itemId}/`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  deleteItem: (token, itemId) =>
    axios.delete(`${BASE_URL}delete/${itemId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default cartApi;
