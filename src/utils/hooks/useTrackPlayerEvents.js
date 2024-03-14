import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {setIsPlaying} from "@store/musicSlice";

const useTrackPlayerEvents = () => {
    const playbackState = usePlaybackState();
    const dispatch = useDispatch();

    useEffect(() => {
        const isCurrentlyPlaying = playbackState.state === State.Playing;

        dispatch(setIsPlaying(isCurrentlyPlaying));
    }, [playbackState, dispatch]);
};


export default useTrackPlayerEvents;