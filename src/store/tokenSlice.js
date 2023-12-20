// src/store/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    authToken: '',
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { setAuthToken } = tokenSlice.actions;

export default tokenSlice.reducer;
