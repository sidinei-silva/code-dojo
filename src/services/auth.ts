import jwtDecode, { JwtPayload } from 'jwt-decode';

// eslint-disable-next-line import/no-cycle
import api from './api';

const TOKEN_KEY = '@code-dojo';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

const isTokenExpired = token => {
  const { exp } = jwtDecode<JwtPayload>(token);

  return exp < Date.now() / 1000;
};

export const login = async (email, password) => {
  return api.post('/api/login', { email, password }).then(res => {
    setToken(res.data.data.token);
  });
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const loggedIn = () => {
  const token = getToken();

  return !!token && !isTokenExpired(token);
};
