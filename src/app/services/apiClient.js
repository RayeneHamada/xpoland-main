// apiClient.js

import axios from 'axios';
import { refreshToken, logout } from './authService';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        if (typeof window !== 'undefined') {
          originalRequest.headers['Authorization'] = `Bearer ${window.localStorage.getItem('accessToken')}`;
        }
        return apiClient.request(originalRequest);
      } catch (error) {
        if (error?.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
