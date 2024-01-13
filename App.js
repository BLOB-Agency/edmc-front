import React, {createContext, Fragment, useContext, useEffect} from "react";
import {Provider as ReduxProvider, useDispatch, useSelector} from "react-redux";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {persistor, store} from "@store/store";
import WelcomeScreen from "@screens/welcomeScreen";
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
import {useLoginEventEmitter} from "@utils/emitters";
import NavigationHeader from "@components/navigationHeader";
import Profile from "@screens/profile";
import {StatusBar, View} from "react-native";
import verifyEmail from "@screens/verifyEmail";
import {BlurView} from "expo-blur";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const NavigationContext = createContext();


export const useNavigationContext = () => useContext(NavigationContext);

const BlurredTabBar = (props) => {
    return (
        <BlurView
            style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }} // Adjust height as needed
            blurType="dark" // Can be 'dark', 'light', or 'xlight'
            blurAmount={10} // Adjust blur intensity
        >
            <BottomTabBar {...props} />
        </BlurView>
    );
};


const UserTabs = () => {
    const user = useSelector((state) => state.auth.user ?? {});
    const navigation = useNavigationContext();


    // useEffect(() => {
    //     if (navigation && user.email_verified_at === null) {
    //         setTimeout(() => navigation.navigate('verifyEmail'), 0);
    //     }
    // }, [navigation]);
  return (
      <Tab.Navigator tabBar={(props) => <BlurredTabBar {...props} />}>
        <Tab.Screen
            name="Profile"
            animation="fade"
            component={Profile}
            options={{
               headerShown: false,
            }}
        />
      </Tab.Navigator>
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
                dispatch(authActions.setToken(result.token));
                dispatch(authActions.setUser(result.user));
            } else {
                dispatch(authActions.setIsLoggedIn(false));
                dispatch(authActions.logOut());

                loginEventEmitter.emit('logoutSuccess');
            }
        });
    }, [dispatch]);


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
                   <NavigationContainer>
                       <NavigationWrapper></NavigationWrapper>
                   </NavigationContainer >
               </PersistGate>
           </ReduxProvider>
       </SafeAreaView>
    );
}

