import axios from "axios";

const BASE_URL = "http://localhost:8000/api/orders/";

const ordersApi = {
  createOrder: (token) =>
    axios.post(`${BASE_URL}create/`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getOrders: (token) =>
    axios.get(`${BASE_URL}list/`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default ordersApi;