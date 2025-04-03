import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/userStore';
import { FaUser, FaEnvelope, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import './Profile.css';

export const Profile = observer(() => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userStore.isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    userStore.logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            <FaUser />
          </div>
          <h2>{userStore.currentUser?.username || 'Пользователь'}</h2>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Выйти
          </button>
        </div>
        
        <div className="profile-info">
          <div className="info-item">
            <FaEnvelope className="icon" />
            <span>{userStore.currentUser?.email || 'Не указан'}</span>
          </div>
          
          <div className="info-item">
            <FaCalendarAlt className="icon" />
            <span>Зарегистрирован: {new Date(userStore.currentUser?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="action-btn">Изменить данные</button>
          <button className="action-btn">Сменить пароль</button>
        </div>
      </div>
    </div>
  );
});