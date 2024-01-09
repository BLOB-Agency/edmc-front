// src/store/userSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await authService.createUser(userData)
        await tokenService.setTokenInStorage(response.access_token);

        return response;
      } catch (error) {
        return rejectWithValue(JSON.parse(error.message));
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
    errors: [],
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
          state.errors = action.payload;
        });
  },
});
export const userActions = {
  ...userSlice.actions,
    registerUser
};
export default userSlice.reducer;
