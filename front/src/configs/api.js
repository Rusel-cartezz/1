import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const apiClient = axios.create({
  baseURL: "http://localhost:8788/jwt/",
  withCredentials: true,
});

// Добавляем interceptor для проверки авторизации
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const checkAdminRole = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    return decoded.roles?.includes('ROLE_ADMIN') || false;
  } catch {
    return false;
  }
};