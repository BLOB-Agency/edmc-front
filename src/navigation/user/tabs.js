import {useMusicPlayer} from "@context/MusicPlayerContext";
import {usePlayerEventEmitter} from "@utils/emitters";
import {useSelector} from "react-redux";
import {BlurView} from "expo-blur";
import {StyleSheet, Image} from "react-native";
import MiniPlayer from "@screens/player/MiniPlayer";
import PlayerModal from "@screens/player/modal";
import {useNavigationContext} from "../../../App";
import {Fragment, useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileStack from "./ProfileStack";
import HomeStack from "./homeStack";
import ChartsStack from "./ChartsStack";

const Tab = createBottomTabNavigator();

const UserTabs = () => {
    const navigation = useNavigationContext();
    const [tabBarHeight, setTabBarHeight] = useState(0);
    const [playerVisible, setPlayerVisible] = useState(false);
    const {currentSong} = useMusicPlayer();
    const playerEventEmitter = usePlayerEventEmitter();
    const user = useSelector(state => state.user);
    const [miniPlayerVisible, setMiniPlayerVisible] = useState(false);
    useEffect(() => {
        // So, if the user is logged in and their email is not verified, we want to redirect them to the verifyEmail screen
        // the username check is to make sure we don't redirect the user to the verifyEmail screen
        // before their entire user object is loaded and we're sure their email is not verified
        // TODO: this should be handled differently, maybe with a global loading state, or a middleware.
        if (navigation && user.username !== '' && user.email_verified_at === null) {
            setTimeout(() => navigation.navigate('verifyEmail'), 0);
        }
    }, [navigation, user]);

    useEffect(() => {
        // A listener to open and close the player modal globally
        // TODO: This should go a layer up, so it also works for artist tabs.
        const openPlayer = () => {
            setMiniPlayerVisible(true);
            setPlayerVisible(true);
        };

        const closePlayer = () => {
            setPlayerVisible(false);
        };

        playerEventEmitter.on('openPlayer', openPlayer);
        playerEventEmitter.on('closePlayer', closePlayer);
        return () => {
            playerEventEmitter.off('openPlayer', openPlayer);
            playerEventEmitter.off('closePlayer', closePlayer);
        };
    }, [navigation]);

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

                onLayout={(event) => {
                    const height = event.nativeEvent.layout.height;
                    setTabBarHeight(height);
                }}
            >
                <Tab.Screen
                    name="Home"
                    animation="fade"
                    component={HomeStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Image
                                source={focused ? require('@assets/icons/home-icon-active.png') : require('@assets/icons/home-icon.png')}
                                style={{ width: 15, height: 15 }}
                            />
                        ),
                        tabBarLabelStyle: {
                            fontFamily: 'Gordita-Regular', // Make sure the font is loaded
                            fontSize: 12,
                        },
                        tabBarActiveTintColor: 'white'
                    }}
                />

                <Tab.Screen
                    name="Charts"
                    animation="fade"
                    component={ChartsStack}
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
                        tabBarActiveTintColor: 'white'
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
                        tabBarActiveTintColor: 'white'
                    }}
                />
            </Tab.Navigator>

            {currentSong && miniPlayerVisible && (
                <MiniPlayer marginBottom={80} setMiniPlayerVisible={setMiniPlayerVisible} setPlayerOpen={setPlayerVisible} />
            )}


            <PlayerModal modalVisible={playerVisible} setModalVisible={setPlayerVisible}  />
        </Fragment>
    );
}

export default UserTabs;