import React, {Fragment, useEffect} from "react";
import {Provider as ReduxProvider, useDispatch, useSelector} from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserTabs = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen
            name="Profile"
            animation="fade"
            component={Profile}
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
            name="SignUpColorPick"
            component={SignUpColorPick}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

const Loader = () => {
    const dispatch = useDispatch();
    const isAuthenticated  = useSelector(state => state.auth.isLoggedIn);

    const checkForToken = async () => {
        const token = await tokenService.getTokenFromStorage();

        if (token) {
            const isValid = await authService.verifyToken(token);
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
                dispatch(userActions.resetUser());
            }
        });
    }, [dispatch]);


    return (
        <Fragment>
            {isAuthenticated ? <UserTabs /> : <AuthStack />}
        </Fragment>
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

