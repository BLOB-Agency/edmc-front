import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {formatNamesWithAnd, formatTime} from "@utils/helpers";
import { useProgress } from "react-native-track-player";
import {ProgressBar} from "@screens/player/progress_bar";
import FastImage from "react-native-fast-image";
import StarDropButton from "@components/StardropButton";
import {useDislikeSongMutation, useLikeSongMutation} from "@store/api/music";

const PlayerInfo = ({ currentSong }) => {
    const { position, duration } = useProgress();
    const [likeSong, { isLoading: isLiking }] = useLikeSongMutation();
    const [dislikeSong, { isLoading: isDisliking }] = useDislikeSongMutation();

    const handleLike = async () => {
        try {
            // Optimistically like the song
            await likeSong(currentSong.id).unwrap();
            // Handle success, e.g., show a toast, or update some local state
        } catch (error) {
            // Handle failure, e.g., revert optimistic update, show error message
        }
    };

    const handleDislike = async () => {
        try {
            // Optimistically dislike the song
            await dislikeSong(currentSong.id).unwrap();
            // Handle success
        } catch (error) {
            // Handle failure
        }
    };

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
                    <TouchableOpacity style={[
                        styles.likeButton,
                        currentSong.liked ? styles.liked : {}
                    ]}

                    onPress={handleLike}
                    >
                        <Image style={[
                            styles.likeIcon,
                            currentSong.liked ? styles.likedIcon : {}
                        ]} source={require("@assets/icons/thumbs-up-icon.png")} />

                        <Text style={[
                            styles.likeText,
                            currentSong.liked ? styles.likedText : {}
                        ]}>
                            {currentSong.likes_count}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        styles.likeButton,
                        currentSong.disliked ? styles.liked : {}
                    ]}

                    onPress={handleDislike}
                    >
                        <Image style={[
                            styles.likeIcon,
                            currentSong.disliked ? styles.likedIcon : {}
                        ]} source={require("@assets/icons/thumbs-down-icon.png")} />
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
