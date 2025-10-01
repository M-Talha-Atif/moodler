// src/services/apiClient.ts
import axios from 'axios';

// Tumhara existing API code adapt karta hun
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.100.6:3000';

const api = axios.create({
  baseURL,
  timeout: 10000,
});

// Request interceptor - token automatically add karega
api.interceptors.request.use(
  async (config) => {
    const token = ''; // Temporary
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;