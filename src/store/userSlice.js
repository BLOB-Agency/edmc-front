// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    password: "",
    color: "#BB61C9",
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
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    logUser: (state) => {
      console.log(
        "The username is: ",
        state.username,
        "The email is: ",
        state.email,
        "The color is: ",
        state.color,
        "The password is: ",
        state.password
      );
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
