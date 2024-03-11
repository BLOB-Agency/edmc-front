import Home from "@screens/home";
import {Album} from "@screens/album";
import ArtistProfile from "@screens/artistProfile";
import {createStackNavigator} from "@react-navigation/stack";
import Playlist from "@screens/playlist";


const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={Home} options={{
                headerShown: false,
            }} />

            <Stack.Screen name="AlbumScreen" component={Album} options={{
                headerShown: false,
            }} />

            <Stack.Screen name="PlaylistScreen" component={Playlist} options={{
                headerShown: false,
            }} />

            <Stack.Screen name="ArtistProfileScreen" component={ArtistProfile} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}

export default HomeStack;