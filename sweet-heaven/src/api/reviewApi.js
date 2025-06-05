// reviewApi.js
import axios from 'axios';

const API_BASE_URL = 'https://sweeth-backend.onrender.com/api';

const getReviews = (productId) => axios.get(`${API_BASE_URL}/reviews/${productId}/`);

export default {
  getReviews,
};
