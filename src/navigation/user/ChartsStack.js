import Profile from "@screens/profile";
import {createStackNavigator} from "@react-navigation/stack";
import {Fragment} from "react";
import Charts from "@screens/charts";
import Playlist from "@screens/playlist";
import ArtistProfile from "@screens/artistProfile";

const Stack = createStackNavigator();

function ChartsStack() {
    return (
        <Fragment>
            <Stack.Navigator>
                <Stack.Screen name="ChartsScreen" component={Charts} options={{
                    headerShown: false,
                }} />

                <Stack.Screen name="PlaylistScreen" component={Playlist} options={{
                    headerShown: false,
                }} />

                <Stack.Screen name="ArtistProfileScreen" component={ArtistProfile} options={{
                    headerShown: false,
                }} />
            </Stack.Navigator>
        </Fragment>
    );
}



export default ChartsStack;