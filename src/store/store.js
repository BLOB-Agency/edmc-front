import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";
import authReducer from "./authSlice";
import loginReducer from "./loginSlice";
import musicReducer from "./musicSlice";
import registrationReducer from "./registrationSlice";
import eventsReducer from "./eventsSlice";
import homeReducer from "./homeSlice";
import albumsReducer from "./albumsSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import {periodicEventSender} from "@store/eventSender";
import {apiService} from "@store/apiService";
import {authApi} from "@store/api/auth";
import {musicApi} from "@store/api/music";
import {artistApi} from "@store/api/artist";
import {userApi} from "@store/api/user";

const reducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  auth: authReducer,
  login: loginReducer,
  home: homeReducer,
  music: musicReducer,
  albums: albumsReducer,
  registration: registrationReducer,
  events: eventsReducer,
  [apiService.reducerPath]: apiService.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [musicApi.reducerPath]: musicApi.reducer,
  [artistApi.reducerPath]: artistApi.reducer,
  [userApi.reducerPath]: userApi.reducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['events', 'music'],
  blacklist: ['user', 'auth', 'albums', 'login', 'registration', 'home', artistApi.reducerPath, musicApi.reducerPath, authApi.reducerPath, apiService.reducerPath]
}


const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
          authApi.middleware,
          userApi.middleware,
          artistApi.middleware,
          musicApi.middleware,
          periodicEventSender
      ),

});


export const persistor = persistStore(store);