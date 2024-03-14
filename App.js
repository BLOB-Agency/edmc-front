import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;




import React, {createContext, Fragment, useContext, useEffect, useState} from "react";
import {Provider as ReduxProvider, useDispatch, useSelector} from "react-redux";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {persistor, store} from "@store/store";
import {PersistGate} from "redux-persist/integration/react";
import tokenService from "@utils/tokenService";
import authService from "@utils/authService";
import {authActions} from "@store/authSlice";
import {userActions} from "@store/userSlice";
import SignUp from "./src/screens/signUp";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import welcome from "@screens/welcome";
import SignIn from "@screens/signIn";
import EventEmitter from "eventemitter3";
import {useLoginEventEmitter, usePlayerEventEmitter} from "@utils/emitters";
import NavigationHeader from "@components/navigationHeader";
import Profile from "@screens/profile";
import {StatusBar, View} from "react-native";
import verifyEmail from "@screens/verifyEmail";
import {BlurView} from "expo-blur";
import Home from "@screens/home";
import {StyleSheet} from "react-native";
import * as TrackPlayer from "react-native-track-player/lib/trackPlayer";
import Player from "@screens/player";
import PlayerModal from "@screens/player/modal";
import {Album} from "@screens/album";
import MiniPlayer from "@screens/player/MiniPlayer";
import {AndroidAudioContentType, IOSCategory, IOSCategoryOptions} from "react-native-track-player";
import {MusicPlayerProvider, useMusicPlayer} from "@context/MusicPlayerContext";
import ArtistProfile from "@screens/artistProfile";
import AuthStack from "./src/navigation/authenticator/stack";
import NavigationStack from "./src/navigation/stack";
import useTrackPlayerEvents from "@utils/hooks/useTrackPlayerEvents";
import useMusicTimer from "@utils/hooks/useMusicTimer";



const NavigationContext = createContext();


export const useNavigationContext = () => useContext(NavigationContext);





const Loader = () => {
    const dispatch = useDispatch();
    const navigation = useNavigationContext();
    const {isLoggedIn, isArtistMode}  = useSelector(state => state.user);
    const loginEventEmitter = useLoginEventEmitter();
    useTrackPlayerEvents();
    useMusicTimer()
    const checkForToken = async () => {
        const token = await tokenService.getTokenFromStorage();
        console.info('token', token)
        if (token) {
            const user = await authService.verifyToken(token);
                        if (user !== false) {
                return {token, user};
            }
        }

        await tokenService.deleteTokenFromStorage();

        return null;
    };



    useEffect(() => {

        const handleLoginSuccess = () => {
            navigation.navigate('UserTabs');
        };

        const handleLogoutSuccess = () => {
                        navigation.navigate('Welcome');
        }

        const goToArtist = () => {
            navigation.navigate('ArtistTabs')
        }

        const goToListener = () => {
            navigation.navigate('UserTabs')
        }

        loginEventEmitter.on('loginSuccess', handleLoginSuccess);
        loginEventEmitter.on('goToArtist', goToArtist);
        loginEventEmitter.on('goToListener', goToListener);
        loginEventEmitter.on('logoutSuccess', handleLogoutSuccess);
        return () => {
            loginEventEmitter.off('loginSuccess', handleLoginSuccess);
            loginEventEmitter.off('logoutSuccess', handleLogoutSuccess);
        };
    }, [navigation]);

    useEffect(() => {
        checkForToken().then((result) => {
            if (result !== null && result.token && result.user) {
                dispatch(userActions.setLoggedIn(true));
                dispatch(userActions.setUser(result.user));

                if (isArtistMode) {
                    navigation.navigate('ArtistTabs')
                }
            } else {
                dispatch(userActions.setLoggedIn(false));
                dispatch(userActions.logOut());

                loginEventEmitter.emit('logoutSuccess');
            }
        });
    }, [dispatch]);

    useEffect(() => {

    }, []);

    return (
       <Fragment>
           {!isLoggedIn ? <AuthStack /> : <NavigationStack />}
       </Fragment>
    )
}

const NavigationWrapper = () => {
    return (
        <NavigationContext.Provider value={useNavigation()}>
            <Loader />
        </NavigationContext.Provider>
    )
}


export default function App() {
    const [fontsLoaded] = useFonts({
        "Cereal-Medium": require("./assets/fonts/AirbnbCereal-Medium.ttf"),
        "Cereal-Bold": require("./assets/fonts/AirbnbCereal-Bold.ttf"),
        "Cereal-Book": require("./assets/fonts/AirbnbCereal-Book.ttf"),
        "Gordita-Medium": require("./assets/fonts/Gordita-Medium.otf"),
        "Gordita-Regular": require("./assets/fonts/Gordita-Regular.otf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
       <SafeAreaView style={{flex:1, backgroundColor: "#1e1e1e"}}>
           <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />

           <ReduxProvider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                   <MusicPlayerProvider>
                       <NavigationContainer>
                           <NavigationWrapper></NavigationWrapper>
                       </NavigationContainer >
                   </MusicPlayerProvider>
               </PersistGate>
           </ReduxProvider>
       </SafeAreaView>
    );
}

