import {BlurView} from "expo-blur";
import {Image, StyleSheet} from "react-native";
import {Fragment} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {default as ArtistHomeStack} from "./homeStack";
import {default as ArtistTracksStack} from "./tracksStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

const ArtistTabs = () => {
    return (
        <Fragment>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: "absolute",
                        // shadowColor: "rgb(47, 64, 85)",
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.12,
                        borderWidth: 0,
                        shadowRadius: 16,
                    },
                    tabBarBackground: () => (
                        <BlurView
                            tint="dark"
                            intensity={40}
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                overflow: "hidden",
                                backgroundColor: "transparent",
                            }}
                        />
                    ),
                }}
            >
                {/*<Tab.Screen*/}
                {/*    name="Home"*/}
                {/*    animation="fade"*/}
                {/*    component={ArtistHomeStack}*/}
                {/*    options={{*/}
                {/*        headerShown: false,*/}
                {/*        tabBarIcon: ({ focused, color, size }) => (*/}
                {/*            <Image*/}
                {/*                source={focused ? require('@assets/icons/home-icon-active.png') : require('@assets/icons/home-icon.png')}*/}
                {/*                style={{ width: 15, height: 15 }}*/}
                {/*            />*/}
                {/*        ),*/}
                {/*        tabBarLabelStyle: {*/}
                {/*            fontFamily: 'Gordita-Regular', // Make sure the font is loaded*/}
                {/*            fontSize: 12,*/}
                {/*        },*/}
                {/*        tabBarActiveTintColor: 'white',*/}
                {/*    }}*/}
                {/*/>*/}

                <Tab.Screen
                    name="My tracks"
                    animation="fade"
                    component={ArtistTracksStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Image
                                source={focused ? require('@assets/icons/disc-icon-active.png') : require('@assets/icons/disc-icon.png')}
                                style={{ width: 15, height: 15 }}
                            />
                        ),
                        tabBarLabelStyle: {
                            fontFamily: 'Gordita-Regular', // Make sure the font is loaded
                            fontSize: 12,
                        },
                        tabBarActiveTintColor: 'white', // Active label and icon color
                        tabBarInactiveTintColor: 'gray', // Inactive label and icon color
                    }}
                />
                
                <Tab.Screen
                    name="Profile"
                    animation="fade"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Image
                                source={focused ? require('@assets/icons/user-icon-active.png') : require('@assets/icons/user-icon.png')}
                                style={{ width: 15, height: 15 }}
                            />
                        ),
                        tabBarLabelStyle: {
                            fontFamily: 'Gordita-Regular', // Make sure the font is loaded
                            fontSize: 12,
                        },
                        tabBarActiveTintColor: 'white',
                    }}
                />

            </Tab.Navigator>
        </Fragment>
    )
}


export default ArtistTabs;