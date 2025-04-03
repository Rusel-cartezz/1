import { useEffect, useState } from 'react';
import { apiClient, checkAdminRole } from '../api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await apiClient.get('/secured'); // Проверяем валидность токена
        setIsAuthenticated(true);
        setIsAdmin(checkAdminRole());
      } catch {
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return { isAuthenticated, isAdmin, loading };
};