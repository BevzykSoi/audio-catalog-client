import { createAction } from '@reduxjs/toolkit';

export const registerRequest = createAction('auth/register/request');
export const registerSuccess = createAction('auth/register/success');
export const registerError = createAction('auth/register/error');

export const loginRequest = createAction('auth/login/request');
export const loginSuccess = createAction('auth/login/success');
export const loginError = createAction('auth/login/error');

export const getProfileRequest = createAction('auth/getProfile/request');
export const getProfileSuccess = createAction('auth/getProfile/success');
export const getProfileError = createAction('auth/getProfile/error');

export const logout = createAction('auth/logout');
