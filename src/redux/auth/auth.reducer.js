import { createReducer } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as actions from './auth.actions';

const user = createReducer(null, {
  [actions.registerSuccess]: (_, { payload }) => payload.user,
  [actions.loginSuccess]: (_, { payload }) => payload.user,
  [actions.getProfileSuccess]: (_, { payload }) => payload.user,
  [actions.registerError]: () => null,
  [actions.loginError]: () => null,
  [actions.getProfileError]: () => null,
  [actions.logout]: () => null,
});

const token = createReducer(null, {
  [actions.registerSuccess]: (_, { payload }) => payload.token,
  [actions.loginSuccess]: (_, { payload }) => payload.token,
  [actions.getProfileSuccess]: (_, { payload }) => payload.token,
  [actions.registerError]: () => null,
  [actions.loginError]: () => null,
  [actions.getProfileError]: () => null,
  [actions.logout]: () => null,
});

const loading = createReducer(false, {
  [actions.registerRequest]: () => true,
  [actions.loginRequest]: () => true,
  [actions.getProfileRequest]: () => true,
  [actions.registerSuccess]: () => false,
  [actions.loginSuccess]: () => false,
  [actions.getProfileSuccess]: () => false,
  [actions.registerError]: () => false,
  [actions.loginError]: () => false,
  [actions.getProfileError]: () => false,
});

export default persistCombineReducers(
  {
    key: 'auth',
    blacklist: ['loading'],
    storage,
  },
  {
    user,
    token,
    loading,
  }
);
