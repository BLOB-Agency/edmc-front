import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import PrimaryBtn from "@components/PrimaryBtn";
import {useMusicPlayer} from "@context/MusicPlayerContext";
import useTrackEvent from "@utils/hooks/useTrackEvent";

const PlayerControls = ({ }) => {
    const trackEvent = useTrackEvent();

    const {
        togglePlayPause,
        toggleRepeat,
        previous,
        next,
        repeatMode,
        isPlaying
    } = useMusicPlayer();

    return (
        <View style={styles.controls}>
            <TouchableOpacity onPress={toggleRepeat}>
                <Image
                    source={repeatMode ? require("@assets/icons/shuffle-icon.png") : require("@assets/icons/repeat-icon.png")}
                    style={{...styles.icon, opacity: repeatMode ? 1 : 0.5}}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={previous}>
                <Image
                    source={require("@assets/icons/skip-back-icon.png")}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <PrimaryBtn disabled={false} onPress={togglePlayPause} style={{width: 50, height: 50}}>
                <Image
                    source={isPlaying ? require("@assets/icons/pause-icon.png") : require("@assets/icons/play-icon.png")}
                    style={styles.icon}
                />
            </PrimaryBtn>

            <TouchableOpacity onPress={next}>
                <Image
                    source={require("@assets/icons/skip-forward-icon.png")}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleRepeat}>
                <Image
                    source={repeatMode ? require("@assets/icons/repeat-icon-active.png") : require("@assets/icons/repeat-icon.png")}
                    style={{...styles.icon, opacity: repeatMode ? 1 : 0.5}}
                />
            </TouchableOpacity>
        </View>
    );
};

export default PlayerControls;
