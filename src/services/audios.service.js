import axios from 'axios';

export function getNew() {
  return axios.get('/audios/new').then((res) => res.data);
}

export function getTop() {
  return axios.get('/audios/top').then((res) => res.data);
}

export function search(q) {
  return axios
    .get('/audios', {
      params: {
        q,
      },
    })
    .then((res) => res.data);
}

export function upload(data) {
  return axios.post('/audios', data).then((res) => res.data);
}

export function listen(id) {
  return axios.get(`/audios/${id}`).then((res) => res.data);
}

export function toggleLike(id) {
  return axios.patch(`/audios/${id}/like`).then((res) => res.data);
}

export function getAudio(id) {
  return axios.get(`/audios/${id}`).then((res) => res.data);
}

export function getAudioComments(id) {
  return axios.get(`/audios/${id}/comments`).then((res) => res.data);
}
