// MusicPlayer.js
import React, { useRef, useState } from 'react';
import {Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image, View} from 'react-native';
// import { useCurrentSong } from '@context/CurrentSongContext';
import styles from './styles';
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";
import {formatNamesWithAnd} from "@utils/helpers";
import TrackPlayer, {State, usePlaybackState, useProgress} from "react-native-track-player";
import {useSelector} from "react-redux";
import {PanGestureHandler} from "react-native-gesture-handler";
import {ProgressBar} from "@screens/player/progress_bar";
import {useMusicPlayer} from "@context/MusicPlayerContext";


const tinyPlayerHeight = 84;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const MiniPlayer = ({marginBottom, setPlayerOpen, setMiniPlayerVisible}) => {
    const {currentSong, play, pause} = useMusicPlayer();
    const { position, duration } = useProgress();
    const user = useSelector((state) => state.user);

    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    const translate = new Animated.Value(0);

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationY: translate } }],
        { useNativeDriver: true }
    );

    const openPlayer = () => {
        setPlayerOpen(true);
    }

    const togglePlayer = async () => {
        if (isPlaying) {
            await pause();
        } else {
            await play();
        }
    }

    const swipeThreshold = -100; // Negative for swiping up to dismiss


    const onHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            let { translationY } = event.nativeEvent;

            if (translationY > swipeThreshold) {
                // Downward swipe detected, dismiss the player
                Animated.timing(translate, {
                    toValue: windowHeight, // Animate off the screen downwards
                    duration: 500,
                    useNativeDriver: true
                }).start(() => {
                    // After animation, update state
                    setPlayerOpen(false);
                    // Reset the translate value for next time
                    translate.setValue(0);
                });
            } else {
                // Swipe didn't reach threshold, animate back to original position
                Animated.timing(translate, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            }
        }
    };


    return (
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
        >
            <Animated.View style={[styles.player, {
                transform: [{ translateY: translate }],
                width: windowWidth - 48,
                height: tinyPlayerHeight,
                top: windowHeight - marginBottom - tinyPlayerHeight - 24
            }]}>
                <BlurView
                    style={styles.absolute}
                    blurType="xlight"
                    blurAmount={0}
                >
                    <LinearGradient
                        colors={['rgba(255,255,255,0.01)','rgba(255,255,255,0.01)', 'rgba(255,255,255,0.15)']}
                        style={styles.gradient}
                    >
                        {/* Your content */}

                        <TouchableOpacity onPress={openPlayer} style={styles.touchableArea}>
                            <Animated.Image source={{ uri: currentSong.cover_image.url }} style={[styles.albumArt, {
                                width: 60,
                                height: 60,
                            }]} />
                            <View style={styles.outerControls}>
                                <View style={styles.controls}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.songTitle}>{currentSong.title}</Text>
                                        <Text style={styles.artist}>{formatNamesWithAnd(currentSong.artists)}</Text>
                                    </View>

                                    <View style={styles.buttons}>
                                        <TouchableOpacity onPress={togglePlayer}>
                                            {isPlaying ? (
                                                <Image source={ require("@assets/icons/pause-icon.png")} style={[styles.icon, {
                                                    width: 18,
                                                    height: 22,
                                                }]} />
                                            ) : (
                                                <Image source={ require("@assets/icons/play-icon.png")} style={[styles.icon, {
                                                    width: 18,
                                                    height: 22,
                                                }]} />
                                            )}
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { setMiniPlayerVisible(false)}}>
                                            <Image source={ require("@assets/icons/close-icon.png")} style={[styles.icon, {
                                                width: 14,
                                                height: 16,
                                            }]} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <ProgressBar onSeek={() => {}} position={position} duration={currentSong.duration} color={user.color} />
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </BlurView>
            </Animated.View>
        </PanGestureHandler>
    );
};



export default MiniPlayer;
