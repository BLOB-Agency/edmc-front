import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles, {progressStyles} from './styles';
import FastImage from "react-native-fast-image";
import {BlurView} from "expo-blur";
import {formatNamesWithAnd, formatTime} from "@utils/helpers";
import {useProgress} from "react-native-track-player";
import * as TrackPlayer from "react-native-track-player/lib/trackPlayer";
import IconButton from "@components/IconButton";
import {SafeAreaView} from "react-native-safe-area-context";

const ProgressBar = ({ position, duration }) => {
    const progress = (position / duration) * 100;
    console.log(progress, position, duration)
    return (
        <View style={progressStyles.progressBarContainer}>
            <View style={[progressStyles.progressBar, { width: `${progress}%` }]} />
        </View>
    );
};


const Player = ({ navigation, route }) => {
    const song = route.params?.song;
    const { position, duration } = useProgress();

    const playPause = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {
            await TrackPlayer.reset();
            await TrackPlayer.add({
                id: song.id,
                url: song.media[0].url,
                title: song.title,
                artist: formatNamesWithAnd(song.artists),
                artwork: song.covers[0].url,
            });
            await TrackPlayer.play();
        } else {
            if (await TrackPlayer.getState() === TrackPlayer.STATE_PAUSED) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }
    return (
        <SafeAreaView style={styles.outerContainer}>
            <FastImage
                source={{
                    uri: song.cover_image[0].url,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.bgImage}
            />
            <BlurView style={styles.blurView} tint="dark" intensity={100} />

            <View style={styles.topContainer}>
                <IconButton
                    src={require("@assets/icons/down-icon.png")}
                />

                <View style={styles.albumTitleContainer}>
                    <Text style={styles.nowPlaying}>Now playing</Text>
                    <Text style={styles.albumTitle}>{song.title}</Text>
                </View>

                <IconButton
                    src={require("@assets/icons/more-icon.png")}
                />
            </View>
            <View style={styles.container}>

                <FastImage
                    source={{
                        uri: song.cover_image[0].url,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.albumArt}
                />
               <View style={styles.titleContainer}>
                   <Text style={styles.title}>{song.title}</Text>
                   <Text style={styles.artist}>{formatNamesWithAnd(song.artists)}</Text>
               </View>

                <View>
                    <ProgressBar position={position} duration={song.duration} />
                    <View style={styles.durationContainer}>
                        <Text style={styles.duration}>{formatTime(position)}</Text>
                        <Text style={styles.duration}>{formatTime(song.duration)}</Text>
                    </View>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => { /* Previous Song */ }}>
                        <Text style={styles.controlButton}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={playPause}>
                        <Text style={styles.controlButton}>Play/Pause</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* Next Song */ }}>
                        <Text style={styles.controlButton}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}></View>
        </SafeAreaView>
    );
};



export default Player;
