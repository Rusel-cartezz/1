import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaLock, FaEnvelope, FaCheck } from 'react-icons/fa';
import { observer } from 'mobx-react';
import { userStore } from '../../../stores/userStore';
import './AuthModal.css';

export const AuthModal = observer(({ 
  isOpen, 
  isLogin, 
  switchForm, 
  closeModal 
}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [localError, setLocalError] = useState('');
  const isLoading = userStore.isLoading; // Используем isLoading из хранилища

  // Синхронизация ошибок из хранилища
  useEffect(() => {
    if (userStore.error) {
      setLocalError(userStore.error);
    }
  }, [userStore.error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatch(
        name === 'password' 
          ? value === formData.confirmPassword 
          : value === formData.password
      );
    }
  };

  const validateForm = () => {
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setLocalError('Пароли не совпадают');
        return false;
      }
      if (formData.password.length < 6) {
        setLocalError('Пароль должен содержать минимум 6 символов');
        return false;
      }
    }
    if (formData.username.length < 3) {
      setLocalError('Имя пользователя должно содержать минимум 3 символа');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!validateForm()) return;

    try {
      if (isLogin) {
        await userStore.login(formData.username, formData.password);
      } else {
        await userStore.register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
      }
      closeModal();
    } catch (err) {
      // Ошибка уже будет в userStore.error, поэтому просто логируем
      console.error('Auth error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          <FaTimes />
        </button>
        
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        
        {(localError || userStore.error) && (
          <div className="error-message">
            {localError || userStore.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder={isLogin ? 'Пароль' : 'Новый пароль'}
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
              {formData.confirmPassword && (
                <span className={`password-check ${passwordMatch ? 'match' : 'no-match'}`}>
                  <FaCheck /> {passwordMatch ? 'Пароли совпадают' : 'Пароли не совпадают'}
                </span>
              )}
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading || (!isLogin && (!passwordMatch || formData.password.length < 6))}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : isLogin ? (
              'Войти'
            ) : (
              'Зарегистрироваться'
            )}
          </button>
        </form>
        
        <div className="switch-form">
          <button type="button" onClick={switchForm}>
            {isLogin 
              ? 'Ещё нет аккаунта? Зарегистрироваться' 
              : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
});