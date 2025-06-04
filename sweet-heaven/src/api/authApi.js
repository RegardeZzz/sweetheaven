import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const authApi = {
  login: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/token/`, data);
    return res.data;
  },

  register: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/register/`, data);
    return res.data;
  },

  getProfile: async (accessToken) => {
    const res = await axios.get(`${API_BASE_URL}/me/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  },

  updateProfile: async (accessToken, updatedData) => {
    const res = await axios.put(`${API_BASE_URL}/me/update/`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  },

  changePassword: async (accessToken, passwordData) => {
    const res = await axios.post(`${API_BASE_URL}/me/change-password/`, passwordData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  }
};

export default authApi;
