import { Routes, Route, Navigate } from 'react-router-dom';
import AdminUsersPage from './pages/AdminUserPage';
import { useAuth } from './hooks/useAuth';

const AppRoutes = () => {
  const { isAdmin } = useAuth(); // Предполагаем, что у вас есть хук для проверки ролей
  
  return (
    <Routes>
      {/* Другие маршруты */}
      <Route 
        path="/users" 
        element={isAdmin ? <AdminUsersPage /> : <Navigate to="/" replace />} 
      />
    </Routes>
  );
};

export default AppRoutes;