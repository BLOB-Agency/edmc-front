import React, {createContext, Fragment, useContext, useEffect, useState} from "react";
import {Provider as ReduxProvider, useDispatch, useSelector} from "react-redux";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {persistor, store} from "@store/store";
import SignUpColorPick from "@screens/signUpColorPick";
import {BottomTabBar, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
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
import {CurrentSongProvider, useCurrentSong} from "./src/context/CurrentSongContext";
import MusicPlayer from "@screens/musicPlayer";
import {Album} from "@screens/album";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const NavigationContext = createContext();


export const useNavigationContext = () => useContext(NavigationContext);


function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={Home} options={{
                headerShown: false,
            }} />

            <Stack.Screen name="AlbumScreen" component={Album} options={{
                headerShown: false,
            }} />


        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={Profile} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}

const UserTabs = () => {
    const navigation = useNavigationContext();
    const [tabBarHeight, setTabBarHeight] = useState(0);
    const [playerVisible, setPlayerVisible] = useState(false);
    const {currentSong} = useCurrentSong();
    const playerEventEmitter = usePlayerEventEmitter();

    // useEffect(() => {
    //     if (navigation && user.email_verified_at === null) {
    //         setTimeout(() => navigation.navigate('verifyEmail'), 0);
    //     }
    // }, [navigation]);

    useEffect(() => {

        const openPlayer = () => {
            setPlayerVisible(true);
        };
        const closePlayer = () => {
            setPlayerVisible(false);
        };

        playerEventEmitter.on('openPlayer', openPlayer);
        playerEventEmitter.on('closePlayer', closePlayer);
        return () => {
            playerEventEmitter.off('openPlayer', openPlayer);
            playerEventEmitter.off('closePlayer', closePlayer);
        };
    }, [navigation]);

  return (
     <Fragment>
         <Tab.Navigator
             screenOptions={{
                 headerShown: false,
                 tabBarStyle: {
                     position: "absolute",
                     // shadowColor: "rgb(47, 64, 85)",
                     shadowOffset: { width: 0, height: -4 },
                     shadowOpacity: 0.12,
                     borderWidth: 0,
                     shadowRadius: 16,
                 },
                 tabBarBackground: () => (
                     <BlurView
                         tint="dark"
                         intensity={40}
                         style={{
                             ...StyleSheet.absoluteFillObject,
                             overflow: "hidden",
                             backgroundColor: "transparent",
                         }}
                     />
                 ),
             }}

             onLayout={(event) => {
                 const height = event.nativeEvent.layout.height;
                 setTabBarHeight(height);
             }}
         >
             <Tab.Screen
                 name="Home"
                 animation="fade"
                 component={HomeStack}
                 options={{
                     headerShown: false,
                 }}
             />

             <Tab.Screen
                 name="Profile"
                 animation="fade"
                 component={ProfileStack}
                 options={{
                     headerShown: false,
                 }}
             />
         </Tab.Navigator>

         {currentSong && (
             <MusicPlayer marginBottom={80} setPlayerOpen={setPlayerVisible} />
         )}


         <PlayerModal modalVisible={playerVisible} setModalVisible={setPlayerVisible}  />
     </Fragment>
  );
}

const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserTabs"
                component={UserTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="verifyEmail"
                component={verifyEmail}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};


const AuthStack = () => {
  return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
            name="Welcome"
            component={welcome}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
        />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SignUpColorPick"
            component={SignUpColorPick}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

const Loader = () => {
    const dispatch = useDispatch();
    const navigation = useNavigationContext();
    const isAuthenticated  = useSelector(state => state.auth.isLoggedIn);
    const loginEventEmitter = useLoginEventEmitter();
    const checkForToken = async () => {
        const token = await tokenService.getTokenFromStorage();
        console.info('token', token)
        if (token) {
            const user = await authService.verifyToken(token);
            console.log('isValid', user)
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
            console.log('logout', navigation, 1)
            navigation.navigate('Welcome');
        }

        loginEventEmitter.on('loginSuccess', handleLoginSuccess);
        loginEventEmitter.on('logoutSuccess', handleLogoutSuccess);
        return () => {
            loginEventEmitter.off('loginSuccess', handleLoginSuccess);
        };
    }, [navigation]);

    useEffect(() => {
        checkForToken().then((result) => {
            if (result !== null && result.token && result.user) {
                dispatch(authActions.setIsLoggedIn(true));
                console.log('user',  result.user)
                dispatch(userActions.setUser(result.user));
            } else {
                dispatch(authActions.setIsLoggedIn(false));
                dispatch(authActions.logOut());

                loginEventEmitter.emit('logoutSuccess');
            }
        });
    }, [dispatch]);

    useEffect(() => {
        TrackPlayer.setupPlayer().then(() => {
            console.log("Track Player is initialized");
        });
    }, []);

    return (
       <Fragment>
           {isAuthenticated ? <UserStack  /> : <AuthStack />}
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
                   <CurrentSongProvider>
                       <NavigationContainer>
                           <NavigationWrapper></NavigationWrapper>
                       </NavigationContainer >
                   </CurrentSongProvider>
               </PersistGate>
           </ReduxProvider>
       </SafeAreaView>
    );
}

