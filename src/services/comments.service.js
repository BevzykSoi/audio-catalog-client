import axios from 'axios';

export function create(data) {
  return axios.post('/comments', data).then((res) => res.data);
}
