import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from '~/utils/jwtDecode';
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
    setCredentials(state, { payload }) {
      const { accessToken } = payload;
      state.accessToken = accessToken;
      state.user = jwtDecode(accessToken);
      LocalStorage.setItem('accessToken', accessToken);
    },
    logout(state, _) {
      state.user = initialState.user;
      state.accessToken = null;
      LocalStorage.removeItem('accessToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
