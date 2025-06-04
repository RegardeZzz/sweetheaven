// reviewApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const getReviews = (productId) => axios.get(`${API_BASE_URL}/reviews/${productId}/`);

export default {
  getReviews,
};
