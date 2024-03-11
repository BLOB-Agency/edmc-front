import Home from "@screens/home";
import {Album} from "@screens/album";
import ArtistProfile from "@screens/artistProfile";
import {createStackNavigator} from "@react-navigation/stack";
import ArtistTracks from "@screens/ArtistTracks";


const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyTracks" component={ArtistTracks} options={{
                headerShown: false,
            }} />

            <Stack.Screen name="AlbumScreen" component={Album} options={{
                headerShown: false,
            }} />

        </Stack.Navigator>
    );
}

export default HomeStack;