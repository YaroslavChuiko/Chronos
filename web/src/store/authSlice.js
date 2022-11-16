import { createSlice } from '@reduxjs/toolkit';
import LocalStorage from '~/utils/LocalStorage';

const initialState = {
  user: {
    id: '',
    login: '',
    email: '',
  },
  accessToken: LocalStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload.user;
    },
    unsetUser(state, _) {
      state.user = initialState.user;
    },
    setToken(state, { payload }) {
      const { accessToken } = payload;
      state.accessToken = accessToken;
      LocalStorage.setItem('accessToken', accessToken);
    },
    logout(state, _) {
      state.accessToken = null;
      LocalStorage.removeItem('accessToken');
    },
  },
});

export const { setUser, unsetUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
