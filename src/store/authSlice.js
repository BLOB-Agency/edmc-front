// Let's make a slice for authentication
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: null,
    isLoggedIn: false,
    id: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.token = "";
      state.user = null;
      state.isLoggedIn = false;
      state.id = null;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
