import axios from 'axios';

export function create(name) {
  return axios.post('/playlists', { name }).then((res) => res.data);
}

export function getById(id) {
  return axios.get(`/playlists/${id}`).then((res) => res.data);
}
