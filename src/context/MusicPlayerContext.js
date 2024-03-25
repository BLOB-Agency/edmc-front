import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import TrackPlayer, {
    AndroidAudioContentType,
    IOSCategory,
    IOSCategoryOptions, RepeatMode, State,
    usePlaybackState, useProgress
} from 'react-native-track-player';
import useTrackEvent, {TrackableEvents} from "@utils/hooks/useTrackEvent";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
    const trackEvent = useTrackEvent();
    const { position, duration } = useProgress();
    const [currentSong, setCurrentSong] = useState(null);
    const [queue, setQueue] = useState([]);
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    const [repeatMode, setRepeatMode] = useState(RepeatMode.Off);

    useEffect(() => {
        TrackPlayer.setupPlayer({
            iosCategory: IOSCategory.Playback,
            iosCategoryOptions: [
                IOSCategoryOptions.AllowAirPlay,
                IOSCategoryOptions.AllowBluetooth,
                IOSCategoryOptions.AllowBluetoothA2DP,
            ],
            androidAudioContentType: AndroidAudioContentType.Music,
            autoHandleInterruptions: true
        }).then(() => {
            
            trackEvent(TrackableEvents.Player.Init)
        });
    }, []);

    const addToQueue = async (song) => {
        await TrackPlayer.add(song);
        setQueue(await TrackPlayer.getQueue());
    };

    const removeFromQueue = async (trackId) => {
        await TrackPlayer.remove(trackId);
        setQueue(await TrackPlayer.getQueue());
    };

    const play = async () => {
        await TrackPlayer.play();

        trackEvent(TrackableEvents.Music.Play, {
            track_id: currentSong.id,
            position,
            duration
        });
    };

    const pause = async () => {
        await TrackPlayer.pause();

        trackEvent(TrackableEvents.Music.Pause, {
            track_id: currentSong.id,
            position,
            duration
        })
    };

    const togglePlayPause = async () => {
        if (isPlaying) {
            await pause();
        } else {
            await play();
        }
    }

    const previous = async () => {
        await TrackPlayer.skipToPrevious();
        trackEvent(TrackableEvents.Music.SkipPrevious, {
            track_id: currentSong.id,
            position,
            duration
        });
    };

    const next = async () => {
        const current = currentSong.id;
        await TrackPlayer.skipToNext();

        trackEvent(TrackableEvents.Music.SkipNext, {
            track_id: currentSong.id,
            position,
            duration
        });
    }

    const toggleRepeat = async () => {
        const repeatMode = await TrackPlayer.getRepeatMode();

        if (repeatMode === RepeatMode.Track) {
            await TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode(RepeatMode.Off);
        } else {
            await TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode(RepeatMode.Track);
        }
    }

    const getRepeatMode = async () => {
        return await TrackPlayer.getRepeatMode();
    }

    const contextValue = useMemo(() => ({
        currentSong,
        setCurrentSong,
        queue,
        setQueue,
        isPlaying,
        repeatMode,
        addToQueue,
        removeFromQueue,
        play,
        pause,
        togglePlayPause,
        previous,
        next,
        toggleRepeat
    }), [currentSong, queue, isPlaying]);

    return (
        <MusicPlayerContext.Provider value={contextValue}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);
    if (!context) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    return context;
};
