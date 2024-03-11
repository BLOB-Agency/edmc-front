import verifyEmail from "@screens/verifyEmail";
import {createStackNavigator} from "@react-navigation/stack";
import UserTabs from "./user/tabs";
import ArtistTabs from "./artist/tabs";

const Stack = createStackNavigator();

// this is essentially the main navigation stack that will be used to navigate between the user and artist tabs
// this is the first stack that will be loaded when the app starts
// Which is why email verification is also included in this stack
// TODO: This is probably not the best place to put the email verification screen
// @dev: or is it? 🤔 maybe put the player modal here too?
const NavigationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserTabs"
                component={UserTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ArtistTabs"
                component={ArtistTabs}
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

export default NavigationStack;