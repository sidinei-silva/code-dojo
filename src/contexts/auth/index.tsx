import { useRouter } from 'next/router';
import React, { createContext, useState, useContext, useEffect } from 'react';

import ApiService from '../../services/api';
import { getToken, setToken, removeToken } from '../../services/storage/token';

const checkToken = async token => {
  ApiService.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: user } = await ApiService.get('users/me');
  if (user) return user;
  return null;
};

interface ContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  login: any;
  logout: any;
}

const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = props => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function loadUserFromLocalStorage() {
      const token = getToken();
      if (token) {
        const checkUser = await checkToken(token);
        if (checkUser) {
          setUser(checkUser);
        }
      }
      setIsLoading(false);
    }
    loadUserFromLocalStorage();
  }, []);

  const login = async (email, password) => {
    const { data: token } = await ApiService.post('users/login', {
      email,
      password
    });
    if (token) {
      setToken(token);
      const checkUser = await checkToken(token);
      if (checkUser) setUser(checkUser);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    delete ApiService.defaults.headers.Authorization;
    router.push('/entrar');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        isLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
