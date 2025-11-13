// src/api/httpClient.ts

import axios from 'axios';

// URL base da sua API rodando localmente
const BASE_URL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para injetar o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Ou de onde você armazena o token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;