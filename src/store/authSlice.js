// Let's make a slice for authentication
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isLoggedIn: false,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    getStatus(state, action) {
      console.log("status: ", state.isLoggedIn)
    }
  },
});

export const authActions = authSlice.actions;