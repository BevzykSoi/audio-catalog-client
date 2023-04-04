import axios from 'axios';

export function getUser(id) {
  return axios.get(`/users/${id}`).then((res) => res.data);
}

export function updateAvatar(id, data) {
  return axios.patch(`/users/${id}/avatar`, data).then((res) => res.data);
}

export function updateBanner(id, data) {
  return axios.patch(`/users/${id}/banner`, data).then((res) => res.data);
}

export function updateProfile(id, data) {
  return axios.put(`/users/${id}`, data).then((res) => res.data);
}

export function getUserAudios(id) {
  return axios.get(`/users/${id}/audios`).then((res) => res.data);
}

export function getUserHistory(id) {
  return axios.get(`/users/${id}/history`).then((res) => res.data);
}

export function getLikedAudios(id) {
  return axios.get(`/users/${id}/likes`).then((res) => res.data);
}

export function followToggle(id) {
  return axios.patch(`/users/${id}/follow`).then((res) => res.data);
}

export function getUserPlaylists(id) {
  return axios.get(`/users/${id}/playlists`).then((res) => res.data);
}
