import axios from 'axios';

export function setToken(token) {
  axios.defaults.headers.authorization = `Bearer ${token}`;
}

export function clearToken() {
  axios.defaults.headers.authorization = undefined;
}
