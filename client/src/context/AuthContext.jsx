import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/api';

const AuthContext = createContext(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('token');

  const fetchUser = async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authAPI.getMe();
      setUser(data.user);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await authAPI.login(email, password);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData) => {
    const { data } = await authAPI.register(userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, getToken, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
