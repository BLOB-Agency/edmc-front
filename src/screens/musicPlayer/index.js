// MusicPlayer.js
import React, { useRef, useState } from 'react';
import {Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image, View} from 'react-native';
// import { useCurrentSong } from '@context/CurrentSongContext';
import styles from './styles';
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";
import {useCurrentSong} from "@context/CurrentSongContext";
import {formatNamesWithAnd} from "@utils/helpers";
import TrackPlayer, {State, usePlaybackState, useProgress} from "react-native-track-player";
import {ProgressBar} from "@screens/player";
import {useSelector} from "react-redux";


const tinyPlayerHeight = 84;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const MusicPlayer = ({marginBottom, setPlayerOpen}) => {
    const {currentSong} = useCurrentSong();
    const playbackState = usePlaybackState();
    const { position, duration } = useProgress();
    const user = useSelector((state) => state.user);

    const isPlaying = playbackState.state === State.Playing;

    const openPlayer = () => {
        setPlayerOpen(true);
    }

    const togglePlayer = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    }

    return (
        <Animated.View style={[styles.player, {
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
                        <Animated.Image source={{ uri: currentSong.cover_image[0].url }} style={[styles.albumArt, {
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

                                   <TouchableOpacity onPress={() => { /* Previous Song */ }}>
                                       <Image source={ require("@assets/icons/skip-forward-icon.png")} style={[styles.icon, {
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
    );
};



export default MusicPlayer;
