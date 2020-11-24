const TOKEN_KEY = '@code-dojo';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
