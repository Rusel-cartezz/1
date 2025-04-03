import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/userStore';
import { UserAPI } from '../../api/userapi';
import { Button, Table, message, Modal, Form, Input, Select, Alert } from 'antd';
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;

export const UsersList = observer(() => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Проверка прав администратора
  const isAdmin = userStore.currentUser?.roles?.includes('ROLE_ADMIN');

  useEffect(() => {
    // Если пользователь не админ - перенаправляем
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    if (!isAdmin) return;
    
    setLoading(true);
    try {
      const usersData = await UserAPI.getUsers();
      setUsers(usersData);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      message.error(errorMessage);
      
      if (err.response?.status === 403) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  // Если пользователь не админ - не рендерим компонент
  if (!isAdmin) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Доступ запрещен"
          description="У вас нет прав для просмотра этой страницы"
          type="error"
          showIcon
        />
      </div>
    );
  }

});