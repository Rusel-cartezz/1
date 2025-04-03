import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { userStore } from './stores/userStore';
import { Header } from './components/Header/Header';
import { AuthModal } from './components/Header/Modal/AuthModal';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import { MainContent } from './components/Main/MainContent';
import { Profile } from './components/Profile/Profile';
import { AdminUsers } from './components/Admin/AdminUsers';
import { Reviews } from './components/Reviews/Reviews';
import { AboutPage } from './components/AboutPage/AboutPage';
import './App.css';

export const App = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [appInitialized, setAppInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await userStore.checkAuth();
      } finally {
        setAppInitialized(true);
      }
    };
    init();
  }, []);

  const handleOpenModal = (isLogin = true) => {
    setIsModalOpen(true);
    setIsLoginForm(isLogin);
    userStore.error = null;
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    userStore.logout();
  };

  if (!appInitialized) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  
  return (
    <Router>
      <div className="App">
        <Header 
          onOpenLoginModal={handleOpenModal}
          onLogout={handleLogout}
        />
        
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<AboutPage />} />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          <Route path="/admin/users" element={
            <PrivateRoute requireAdmin>
              <AdminUsers />
            </PrivateRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <AuthModal
          isOpen={isModalOpen}
          isLogin={isLoginForm}
          switchForm={() => setIsLoginForm(!isLoginForm)}
          closeModal={handleCloseModal}
        />
      </div>
    </Router>
  );
});