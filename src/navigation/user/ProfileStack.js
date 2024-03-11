import Profile from "@screens/profile";
import {createStackNavigator} from "@react-navigation/stack";
import {Fragment} from "react";

const Stack = createStackNavigator();

function ProfileStack() {
    return (
       <Fragment>
           <Stack.Navigator>
               <Stack.Screen name="ProfileScreen" component={Profile} options={{
                   headerShown: false,
               }} />

           </Stack.Navigator>
       </Fragment>
    );
}



export default ProfileStack;