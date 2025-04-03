import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserShield } from 'react-icons/fa';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/userStore';
import './MobileMenu.css';

export const MobileMenu = observer(({ 
  location, 
  onLogout, 
  onOpenLoginModal, 
  closeMenu,
  onAdminClick
}) => {
  return (
    <motion.div 
      className="mobile-menu-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mobile-menu-overlay" onClick={closeMenu} />
      <motion.div 
        className="mobile-menu"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/reviews" className={`nav-link ${location.pathname === '/reviews' ? 'active' : ''}`} onClick={closeMenu}>
                Отзывы
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>
                О нас
              </Link>
            </li>
            
            {userStore.isAdmin && (
              <li>
                <button onClick={onAdminClick} className="mobile-admin-button">
                  <FaUserShield className="icon" /> Админ панель
                </button>
              </li>
            )}
            
            <li className="mobile-auth-buttons">
              {userStore.isAuthenticated ? (
                <>
                  <Link to="/profile" className="nav-link profile-link" onClick={closeMenu}>
                    <FaUser className="icon" /> Профиль
                  </Link>
                  <button onClick={() => {
                    onLogout();
                    closeMenu();
                  }} className="logout-button">
                    <FaSignOutAlt className="icon" /> Выйти
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    onOpenLoginModal();
                    closeMenu();
                  }} 
                  className="auth-button"
                >
                  <FaSignInAlt className="icon" /> Вход
                </button>
              )}
            </li>
          </ul>
        </nav>
      </motion.div>
    </motion.div>
  );
});