// src/store/userSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, { rejectWithValue }) => {

      try {
        return await authService.createUser(userData)
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);


export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    username: "",
    email: "",
    password: "",
    color: "#BB61C9",
    error: null,
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
    resetUser: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});
export const userActions = {
  ...userSlice.actions,
    registerUser
};
export default userSlice.reducer;
