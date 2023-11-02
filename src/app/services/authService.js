// authService.js

import apiClient from './apiClient';

const login = async (payload) => {
  try {
    const response = await apiClient.post('/visitor/login', payload);
    const { accessToken, refreshToken } = response.data;

    // Store tokens in local storage 
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  // Clear tokens and any other user data
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const register = async (payload) => {
  try {
    const response = await apiClient.post('/user/register', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const response = await apiClient.post('/user/refreshToken', {
      refreshToken: localStorage.getItem('refreshToken'),
    });

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', token);

    return accessToken;
  } catch (error) {
    throw error;
  }
};

export { login, logout, register, refreshToken };
