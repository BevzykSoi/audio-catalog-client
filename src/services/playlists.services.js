import axios from 'axios';

export function create(name) {
  return axios.post('/playlists', { name }).then((res) => res.data);
}
