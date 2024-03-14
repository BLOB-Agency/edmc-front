import TrackPlayer, { usePlaybackState, Event } from 'react-native-track-player';
import {useEffect, useState} from "react";

const useRewardStars = () => {
    const playbackState = usePlaybackState();
    const [playbackTime, setPlaybackTime] = useState(0); // Track playback time in seconds
    const [stars, setStars] = useState(0); // User's stars

    useEffect(() => {
        let intervalId;

        if (playbackState === TrackPlayer.STATE_PLAYING) {
            intervalId = setInterval(async () => {
                const currentPosition = await TrackPlayer.getPosition();
                const newTime = playbackTime + 5; // Assuming this interval runs every 5 seconds
                setPlaybackTime(newTime);

                // Reward a star for every 300 seconds of music listened
                if (newTime % 300 === 0) {
                    setStars(stars + 1);
                    // Here, you might also want to persist the stars count to a server or local storage
                }
            }, 5000); // 5000 milliseconds = 5 seconds
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [playbackState, playbackTime, stars]);

    return [stars, setStars];
};
