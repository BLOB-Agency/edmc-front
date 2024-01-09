import React, {createContext, Fragment, useContext, useEffect} from "react";
import {Provider as ReduxProvider, useDispatch, useSelector} from "react-redux";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {persistor, store} from "@store/store";
import WelcomeScreen from "@screens/welcomeScreen";
import SignUpColorPick from "@screens/signUpColorPick";
import Profile from "./src/screens/profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {PersistGate} from "redux-persist/integration/react";
import tokenService from "@utils/tokenService";
import authService from "@utils/authService";
import {authActions} from "@store/authSlice";
import {userActions} from "@store/userSlice";
import SignUp from "./src/screens/signUp";
import {SafeAreaProvider} from "react-native-safe-area-context";
import welcome from "@screens/welcome";
import SignIn from "@screens/signIn";
import EventEmitter from "eventemitter3";
import {useLoginEventEmitter} from "@utils/emitters";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const NavigationContext = createContext();


export const useNavigationContext = () => useContext(NavigationContext);

const UserTabs = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen
            name="Profile"
            animation="fade"
            component={Profile}
            options={{ headerShown: false }}
        />
      </Tab.Navigator>
  );
}

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
            const isValid = await authService.verifyToken(token);
            console.log('isValid', isValid)
            if (isValid) {
                return token;
            }
        }

        return null;
    };

    useEffect(() => {
        checkForToken().then(token => {
            if (token) {
                dispatch(authActions.setIsLoggedIn(true));
            } else {
                dispatch(authActions.setIsLoggedIn(false));
                dispatch(authActions.logOut());
            }
        });
    }, [dispatch]);

    useEffect(() => {
        const handleLoginSuccess = () => {
            navigation.navigate('UserTabs');
        };

        loginEventEmitter.on('loginSuccess', handleLoginSuccess);

        return () => {
            loginEventEmitter.off('loginSuccess', handleLoginSuccess);
        };
    }, [navigation]);


    return (
        <NavigationContext.Provider value={useNavigation()}>
            <Fragment>
                {isAuthenticated ? <UserTabs  /> : <AuthStack />}
            </Fragment>
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
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                            <Loader></Loader>
                    </NavigationContainer >
            </PersistGate>
        </ReduxProvider>
    );
}

