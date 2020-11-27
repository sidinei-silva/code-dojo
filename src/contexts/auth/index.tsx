import { useRouter } from 'next/router';
import React, { createContext, useState, useContext, useEffect } from 'react';

import ApiService from '../../services/api';
import { getToken, setToken, removeToken } from '../../services/storage/token';

const checkToken = async token => {
  ApiService.defaults.headers.Authorization = `Bearer ${token}`;
  const user = await ApiService.get('users/me')
    .then(response => response.data)
    .catch(err => {
      return false;
    });
  if (user) return user;
  return null;
};

type LoginType = (email: string, password: string) => Promise<void>;
type LogoutType = () => void;

interface UserProps {
  email: string;
  name: string;
}

interface ContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProps;
  login: LoginType;
  logout: LogoutType;
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

  const login: LoginType = async (email, password) => {
    const { token } = await ApiService.post('users/login', {
      email,
      password
    }).then(response => {
      return response.data.data;
    });

    if (token) {
      setToken(token);
      const checkUser = await checkToken(token);
      if (checkUser) setUser(checkUser);
      router.push('/dashboard');
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

const useAuth = () => useContext(AuthContext);

export default useAuth;
