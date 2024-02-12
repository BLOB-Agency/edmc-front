import { useState } from 'react';
import * as TrackPlayer from "react-native-track-player/lib/trackPlayer";
import {State, usePlaybackState} from "react-native-track-player";
import useTrackEvent from "@utils/hooks/useTrackEvent";
import {useMusicPlayer} from "@context/MusicPlayerContext";

export const usePlayerControls = () => {
    const { play, pause, next, previous, isPlaying } = useMusicPlayer();

    const [repeatMode, setRepeatMode] = useState(false);

    const playPause = async () => {
        if (isPlaying) {
            trackEvent({
            })
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    };

    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    };

    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const toggleRepeat = () => {
        setRepeatMode(!repeatMode);
    };

    return { playPause, skipToNext, skipToPrevious, toggleRepeat ,isPlaying, repeatMode};
};

export default usePlayerControls;
