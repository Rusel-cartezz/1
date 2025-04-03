import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/userStore';

export const PrivateRoute = observer(({ children, requireAdmin = false }) => {
  const location = useLocation();

  if (!userStore.isAuthenticated) {
    // Перенаправляем на главную с сохранением текущего пути для возврата после входа
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && !userStore.isAdmin) {
    // Для администраторских роутов
    return <Navigate to="/" replace />;
  }

  return children;
});