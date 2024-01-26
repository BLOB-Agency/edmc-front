import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";
import authReducer from "./authSlice";
import loginReducer from "./loginSlice";
import registrationReducer from "./registrationSlice";
import homeReducer from "./homeSlice";
import albumsReducer from "./albumsSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  auth: authReducer,
  login: loginReducer,
  home: homeReducer,
  albums: albumsReducer,
  registration: registrationReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'auth'],
  blacklist: ['albums', 'login', 'registration', 'home']
}


const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);