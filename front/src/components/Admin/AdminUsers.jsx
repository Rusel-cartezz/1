import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { Table, message } from 'antd';
import './AdminUsers.css';

export const AdminUsers = observer(() => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.isAdmin) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await userStore.getUsers();
      setUsers(usersData);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Роли',
      dataIndex: 'roles',
      key: 'roles',
      render: roles => roles.join(', '),
    },
  ];

  return (
    <div className="admin-users-container">
      <h2>Управление пользователями</h2>
      <Table 
        dataSource={users} 
        columns={columns} 
        loading={loading}
        rowKey="id"
      />
    </div>
  );
});