import React, { useState, useEffect } from 'react';
import './index.css';
import { AuthApp } from './components/auth/auth';
import { StudentApp } from './components/students/app';
import { AdminApp } from './components/admin/app';
import { Toast } from './components/common/toast';
import { useToast } from './hooks/toast';
import { INIT_DISHES } from './data/data';
import { T } from './themes';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState(INIT_DISHES);
  const [toast, showToast] = useToast();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Session expired');
        })
        .then(userData => {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    showToast('👋 Logged out successfully');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C)"
      }}>
        <div style={{ color: "#fff", fontSize: "1.2rem" }}>
          Loading... 🍽️
        </div>
      </div>
    );
  }

  return (
    <div>
      {!user && <AuthApp onLogin={handleLogin} />}
      {user?.role === "student" && (
        <StudentApp 
          user={user} 
          onLogout={handleLogout} 
          dishes={dishes} 
          showToast={showToast} 
        />
      )}
      {user?.role === "admin" && (
        <AdminApp 
          user={user} 
          onLogout={handleLogout} 
          dishes={dishes} 
          setDishes={setDishes} 
          showToast={showToast} 
        />
      )}
      <Toast toast={toast} />
    </div>
  );
}

export default App;