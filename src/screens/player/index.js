import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated} from 'react-native';
import styles, {progressStyles} from './styles';
import FastImage from "react-native-fast-image";
import {BlurView} from "expo-blur";
import {formatNamesWithAnd, formatTime} from "@utils/helpers";
import {State, usePlaybackState, useProgress, useTrackPlayerEvents, Event} from "react-native-track-player";
import * as TrackPlayer from "react-native-track-player/lib/trackPlayer";
import IconButton from "@components/IconButton";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useCurrentSong} from "../../context/CurrentSongContext";
import SecondaryBtn from "@components/SecondaryBtn";
import PrimaryBtn from "@components/PrimaryBtn";
import {usePlayerEventEmitter} from "@utils/emitters";


export const ProgressBar = ({ position, duration, onSeek, color = "white" }) => {
    // Using Animated.Value to represent the progress
    const widthAnim = useRef(new Animated.Value(0)).current;

    // Calculate the progress percentage
    const progress = (position / duration) * 100;

    useEffect(() => {
        // Animate the width change
        Animated.timing(widthAnim, {
            toValue: progress,
            duration: 250, // You can adjust the duration
            useNativeDriver: false, // Set to true if you are not animating properties that need layout calculation
        }).start();
    }, [position, progress, widthAnim]);

    const handleSeek = (evt) => {
        // Calculate the seek position
        const seekPosition = (evt.nativeEvent.locationX / evt.currentTarget.offsetWidth) * duration;
        onSeek(seekPosition);
    };


    return (
        <TouchableWithoutFeedback onPress={handleSeek}>
            <View style={progressStyles.progressBarContainer}>
                <Animated.View style={[progressStyles.progressBar, {
                    width: widthAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%']
                    }),
                    backgroundColor: color
                }]} />
            </View>
        </TouchableWithoutFeedback>
    );
};



const Player = ({ }) => {
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;

    const [repeatMode, setRepeatMode] = useState(false);

    const {currentSong} = useCurrentSong();
    const { position, duration } = useProgress();
    const insets = useSafeAreaInsets();
    const playerEventEmitter = usePlayerEventEmitter();

    const handleSeek = async (position) => {
        await TrackPlayer.seekTo(position);
    };

    const playPause = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: currentSong.id,
                url: currentSong.media[0].url,
                title: currentSong.title,
                artist: formatNamesWithAnd(currentSong.artists),
                artwork: currentSong.covers[0].url,
            });
            await TrackPlayer.play();
        } else {
            const state  = await TrackPlayer.getPlaybackState();
            if (state.state === State.Paused || state.state === State.Stopped || state.state === State.None) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (repeatMode && event.nextTrack === null && playbackState.state === State.Playing) {
            // Repeat the current track
            let currentTrack = await TrackPlayer.getCurrentTrack();
            if (currentTrack != null) {
                await TrackPlayer.skip(currentTrack);
                await TrackPlayer.play();
            }
        }
    });

    const toggleRepeat = () => {
        setRepeatMode(!repeatMode);
    };

    if (!currentSong) {
        return null;
    }

    return (
        <View style={{...styles.outerContainer, paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <FastImage
                source={{
                    uri: currentSong.cover_image[0].url,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.bgImage}
            />
            <BlurView style={styles.blurView} tint="dark" intensity={75} />

            <View style={styles.topContainer}>
                <IconButton
                    src={require("@assets/icons/down-icon.png")}
                    onPress={() => playerEventEmitter.emit('closePlayer')}
                />

                <View style={styles.albumTitleContainer}>
                    <Text style={styles.nowPlaying}>Now playing</Text>
                    <Text style={styles.albumTitle}>{currentSong.title}</Text>
                </View>

                <IconButton
                    src={require("@assets/icons/more-icon.png")}
                />
            </View>
            <View style={styles.container}>

                <FastImage
                    source={{
                        uri: currentSong.cover_image[0].url,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.albumArt}
                />
               <View style={styles.titleContainer}>
                   <Text style={styles.title}>{currentSong.title}</Text>
                   <Text style={styles.artist}>{formatNamesWithAnd(currentSong.artists)}</Text>
               </View>

                <View>
                    <ProgressBar onSeek={handleSeek} position={position} duration={currentSong.duration} />
                    <View style={styles.durationContainer}>
                        <Text style={styles.duration}>{formatTime(position)}</Text>
                        <Text style={styles.duration}>{formatTime(currentSong.duration)}</Text>
                    </View>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => { /* Previous Song */ }}>
                        <Image source={ require("@assets/icons/shuffle-icon.png")} style={[styles.icon, {
                            width: 14,
                            height: 16,
                        }]} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { /* Previous Song */ }}>
                        <Image source={ require("@assets/icons/skip-back-icon.png")} style={[styles.icon, {
                            width: 14,
                            height: 16,
                        }]} />
                    </TouchableOpacity>

                    <PrimaryBtn onPress={playPause} style={{width: 50, height: 50}}>
                        {isPlaying ? (
                            <Image source={ require("@assets/icons/pause-icon.png")} style={[styles.icon, {
                                width: 14,
                                height: 18,
                            }]} />
                        ) : (
                            <Image source={ require("@assets/icons/play-icon.png")} style={[styles.icon, {
                                width: 14,
                                height: 18,
                            }]} />
                        )}
                    </PrimaryBtn>

                    <TouchableOpacity onPress={() => { /* Next Song */ }}>
                        <Image source={ require("@assets/icons/skip-forward-icon.png")} style={[styles.icon, {
                            width: 14,
                            height: 16,
                        }]} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleRepeat}>
                        {repeatMode ? (
                            <Image source={ require("@assets/icons/repeat-icon-active.png")} style={[styles.icon, {
                                width: 14,
                                height: 16,
                            }]} />
                        ) : (
                            <Image source={ require("@assets/icons/repeat-icon.png")} style={[styles.icon, {
                                width: 14,
                                height: 16,
                                opacity: 0.5,
                            }]} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}></View>
        </View>
    );
};



export default Player;
