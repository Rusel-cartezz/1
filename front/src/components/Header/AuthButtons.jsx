import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/userStore';
import './AuthButtons.css';

export const AuthButtons = observer(({ onOpenLoginModal, onLogout }) => {
  return (
    <div className="auth-buttons">
      {userStore.isAuthenticated ? (
        <>
          <Link to="/profile" className="nav-link profile-link">
            <FaUser className="icon" /> Профиль
          </Link>
          <button onClick={onLogout} className="logout-button">
            <FaSignOutAlt className="icon" /> Выйти
          </button>
        </>
      ) : (
        <button onClick={onOpenLoginModal} className="auth-button">
          <FaSignInAlt className="icon" /> Вход
        </button>
      )}
    </div>
  );
});