import welcome from "@screens/welcome";
import SignUp from "@screens/signUp";
import SignIn from "@screens/signIn";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

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
        </Stack.Navigator>
    );
};

export default AuthStack;