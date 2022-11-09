import { createReducer, combineReducers } from '@reduxjs/toolkit';

import * as actions from './audios.actions';

const playlist = createReducer([], {
  [actions.setPlaylist]: (_, { payload }) => payload,
});

const audioIndex = createReducer(-1, {
  [actions.setIndex]: (_, { payload }) => payload,
});

export default combineReducers({
  playlist,
  audioIndex,
});
