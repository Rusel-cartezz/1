import axios from "axios";

const API_BASE_URL = 'http://localhost:8788/jwt';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const UserAPI = {
  async register(userData) {
    try {
      const response = await apiClient.post('/registration', userData);
      localStorage.setItem('authToken', response.data.token);
      return {
        ...response.data.user,
        token: response.data.token,
        roles: response.data.roles || []
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Ошибка регистрации');
    }
  },

  async login(username, password) {
    try {
      const response = await apiClient.post('/auth', { username, password });
      localStorage.setItem('authToken', response.data.token);
      return {
        ...response.data.user,
        token: response.data.token,
        roles: response.data.roles || []
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Ошибка авторизации');
    }
  },

  async checkAuth() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      const response = await apiClient.get('/validate');
      return {
        ...response.data,
        token: token,
        roles: response.data.roles || []
      };
    } catch (error) {
      localStorage.removeItem('authToken');
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    return apiClient.post('/exit');
  }
};