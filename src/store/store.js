import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    auth: authReducer,
  },
});
