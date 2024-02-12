import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {formatNamesWithAnd, formatTime} from "@utils/helpers";
import { useProgress } from "react-native-track-player";
import {ProgressBar} from "@screens/player/progress_bar";
import FastImage from "react-native-fast-image";
import StarDropButton from "@components/StardropButton";

const PlayerInfo = ({ currentSong }) => {
    const { position, duration } = useProgress();

    return (
        <View style={styles.infoContainer}>
            <FastImage
                source={{
                    uri: currentSong.cover_image[0].url,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.albumArt}
            />
            <View style={styles.infoTextContainer}>
                <Text style={styles.title}>{currentSong.title}</Text>
                <Text style={styles.artist}>{formatNamesWithAnd(currentSong.artists)}</Text>
            </View>
            <View style={styles.dropContainer}>
                <View style={styles.likeButtons}>
                    <TouchableOpacity style={styles.likeButton}>
                        <Image style={styles.likeIcon} source={require("@assets/icons/thumbs-up-icon.png")} />

                        <Text style={styles.likeText}>
                            500K
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.likeButton}>
                        <Image style={styles.likeIcon} source={require("@assets/icons/thumbs-down-icon.png")} />
                    </TouchableOpacity>
                </View>

                <StarDropButton/>
            </View>
            <View>
                <ProgressBar position={position} duration={duration} />
                <View style={styles.durationContainer}>
                    <Text style={styles.duration}>{formatTime(position)}</Text>
                    <Text style={styles.duration}>{formatTime(duration)}</Text>
                </View>
            </View>
        </View>
    );
};

export default PlayerInfo;
