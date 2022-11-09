import axios from 'axios';

export function register(data) {
  return axios.post('/auth/register', data).then((res) => res.data);
}

export function login(data) {
  return axios.post('/auth/login', data).then((res) => res.data);
}

export function getProfile() {
  return axios.get('/auth/profile').then((res) => res.data);
}
