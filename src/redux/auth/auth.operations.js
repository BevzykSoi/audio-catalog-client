import i18n from 'i18next';

import * as actions from './auth.actions';
import * as authService from 'services/auth.service';
import { setToken, clearToken } from 'utils/authToken';

export const register = (data) => (dispatch) => {
  dispatch(actions.registerRequest());

  authService
    .register(data)
    .then((res) => {
      setToken(res.token);
      dispatch(actions.registerSuccess(res));
    })
    .catch((error) => {
      dispatch(actions.registerError(error.message));
    });
};

export const login = (data) => (dispatch) => {
  dispatch(actions.loginRequest());

  authService
    .login(data)
    .then((res) => {
      setToken(res.token);
      dispatch(actions.loginSuccess(res));
    })
    .catch((error) => {
      dispatch(actions.loginError(error.message));
    });
};

export const getProfile = (data) => (dispatch, getState) => {
  const state = getState();

  const token = state.auth.token;
  if (!token) {
    return;
  }

  setToken(token);

  dispatch(actions.getProfileRequest());

  authService
    .getProfile(data)
    .then((res) => {
      document.querySelector('html').dataset.theme = res.user.profile?.theme;
      dispatch(actions.getProfileSuccess(res));
    })
    .catch((error) => {
      dispatch(actions.getProfileError(error.message));
    });
};

export const logout = () => (dispatch) => {
  clearToken();
  dispatch(actions.logout());
};
