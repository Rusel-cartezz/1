import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaBars, FaUserShield } from 'react-icons/fa';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/userStore';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { AuthButtons } from './AuthButtons';
import { MobileMenu } from './MobileMenu';
import './Header.css';

export const Header = observer(({ onOpenLoginModal, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const handleAdminClick = () => {
    navigate('/admin/users');
    closeMenu();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Logo closeMenu={closeMenu} />
        
        <DesktopNav location={location} />
        
        <div className="header-controls">
          {userStore.isAuthenticated && userStore.isAdmin && (
            <button 
              onClick={handleAdminClick}
              className="admin-panel-button"
              title="Админ панель"
            >
              <FaUserShield className="admin-icon" />
              <span>Админ панель</span>
            </button>
          )}
          
          <AuthButtons 
            onOpenLoginModal={onOpenLoginModal}
            onLogout={onLogout}
          />
        </div>

        <button 
          className={`burger-button ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu 
              isAdmin={userStore.isAdmin}
              onAdminClick={handleAdminClick}
              onLogout={onLogout}
              onOpenLoginModal={onOpenLoginModal}
              closeMenu={closeMenu}
            />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
});