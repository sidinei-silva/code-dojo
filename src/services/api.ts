import axios from 'axios';

// eslint-disable-next-line import/no-cycle
import { loggedIn, getToken, logout } from './auth';

const ApiService = axios.create();

ApiService.interceptors.request.use(async config => {
  const configFunction = config;

  if (loggedIn()) {
    configFunction.headers.Authorization = `Bearer ${getToken()}`;
  }

  return configFunction;
});

ApiService.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      logout();
    }
    throw error;
  }
);

export default ApiService;
