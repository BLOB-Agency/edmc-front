import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";
import authReducer from "./authSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  auth: authReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}


const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);