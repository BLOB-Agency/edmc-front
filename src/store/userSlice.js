// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    color: '',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setUsername, setEmail, setColor } = userSlice.actions;

export default userSlice.reducer;
