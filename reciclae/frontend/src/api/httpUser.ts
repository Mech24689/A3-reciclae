
import axios from 'axios';

// 🚨 URL base do MS-Usuário
const AUTH_BASE_URL = 'http://localhost:3001/api'; 

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Você pode aplicar o interceptor aqui também
authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authClient;