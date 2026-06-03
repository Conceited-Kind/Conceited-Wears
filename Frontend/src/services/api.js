import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://conceited-wears-backend.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product endpoints
export const productAPI = {
  // Get all products
  getAllProducts: () => apiClient.get('/products/'),
  
  // Get single product
  getProduct: (id) => apiClient.get(`/products/${id}/`),
  
  // Create product (admin)
  createProduct: (data) => apiClient.post('/products/', data),
  
  // Update product (admin)
  updateProduct: (id, data) => apiClient.put(`/products/${id}/`, data),
  
  // Delete product (admin)
  deleteProduct: (id) => apiClient.delete(`/products/${id}/`),
};

export default apiClient;