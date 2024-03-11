import Home from "@screens/home";
import {Album} from "@screens/album";
import ArtistProfile from "@screens/artistProfile";
import {createStackNavigator} from "@react-navigation/stack";
import {Fragment} from "react";
import Playlist from "@screens/playlist";

const Stack = createStackNavigator();
function HomeStack() {
    return (
       <Fragment>
           <Stack.Navigator>
               <Stack.Screen name="HomeScreen" component={Home} options={{
                   headerShown: false,
               }} />

             {/*  {{ /**/}
             {/*   * The album and artist profile screens are in this stack because*/}
             {/*   * you can navigate to them from the "home screen stack".*/}
             {/*   * (e.g. when you click on an album or artist profile from the player)*/}
             {/**!/}*/}
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
       </Fragment>
    );
}

export default HomeStack;