import Axios from 'axios';

import { getToken, removeToken } from './storage/token';

const urls = {
  test: `http://localhost:3334/api`,
  development: 'http://localhost:3000/api',
  production: 'https://your-production-url.com/api'
};
const ApiService = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

ApiService.interceptors.request.use(async config => {
  const configFunction = config;

  configFunction.headers.Authorization = `Bearer ${getToken()}`;

  return configFunction;
});

ApiService.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      removeToken();
    }
    throw error;
  }
);

export default ApiService;
