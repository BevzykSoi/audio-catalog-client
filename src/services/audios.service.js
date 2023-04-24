import axios from 'axios';

export function getNew(page) {
  return axios
    .get('/audios/new', {
      params: {
        page,
      },
    })
    .then((res) => res.data);
}

export function getTop(page) {
  return axios
    .get('/audios/top', {
      params: {
        page,
      },
    })
    .then((res) => res.data);
}

export function search(q, page) {
  return axios
    .get('/audios', {
      params: {
        q,
        page,
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

export function addToPlaylist(audioId, playlistId) {
  return axios
    .patch(`/audios/${audioId}/playlist/add`, { playlistId })
    .then((res) => res.data);
}

export function removeFromPlaylist(audioId, playlistId) {
  return axios
    .patch(`/audios/${audioId}/playlist/remove`, { playlistId })
    .then((res) => res.data);
}
