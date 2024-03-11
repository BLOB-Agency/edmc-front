// src/store/userSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userData, { rejectWithValue }) => {
      try {
        let response =  await authService.loginUser(userData);
        await tokenService.setTokenInStorage(response.access_token);

        return response;
      } catch (error) {
                  return rejectWithValue(JSON.parse(error.message));
      }
    }
);


export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    email: "",
    password: "",
    errors: [],
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
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
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        });
  },
});
export const loginActions = {
  ...loginSlice.actions,
    loginUser
};
export default loginSlice.reducer;
