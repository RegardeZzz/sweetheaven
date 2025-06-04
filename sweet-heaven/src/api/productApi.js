import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; 

const productApi = {
    getProductsByCategory: async (categorySlug) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/products/category/${categorySlug}/`
            );
            return { data: response.data };
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/`);
            return response;
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product details:', error);
            throw error;
        }
    },

    getAllCategories: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }, 

    getRelatedProducts: async (categorySlug) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/category/${categorySlug}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching related products:', error);
            throw error;
        }
    }
};

export default productApi;
