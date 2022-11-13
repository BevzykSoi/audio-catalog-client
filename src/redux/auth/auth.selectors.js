export const getUser = (state) => state.auth.user;
export const getToken = (state) => state.auth.token;
export const getLoading = (state) => state.auth.loading;
export const isLoggedIn = (state) => state.auth.user && state.auth.token;
export const getError = (state) => state.auth.error;
