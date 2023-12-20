import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useFonts} from 'expo-font';
import { store } from './src/store/store';
import WelcomeScreen from './src/screens/welcomeScreen';
import SignUpScreen from './src/screens/signUpScreen';
// ... import other screens

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Cereal-Medium': require('./assets/fonts/AirbnbCereal-Medium.ttf'),
    'Cereal-Bold': require('./assets/fonts/AirbnbCereal-Bold.ttf'),
    'Cereal-Book': require('./assets/fonts/AirbnbCereal-Book.ttf'),
    'Gordita-Medium': require('./assets/fonts/Gordita-Medium.otf'),
    'Gordita-Regular': require('./assets/fonts/Gordita-Regular.otf'),

});

if (!fontsLoaded) {
    return null;
}
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} // No header for welcome screen
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{ headerShown: false }}
            // Add options here if you want to customize the header for SignUp screen
          />
          {/* Add other screens and their respective options here */}
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
