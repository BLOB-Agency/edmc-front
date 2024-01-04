// Let's make a slice for authentication
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
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
    getStatus(state) {
      console.log("status: ", state.isLoggedIn);
      console.log("token: ", state.token);
      console.log("id: ", state.id);
    },
    logOut(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.id = null;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
