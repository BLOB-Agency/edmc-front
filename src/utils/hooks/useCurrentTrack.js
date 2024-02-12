import { useState, useEffect } from 'react';
import TrackPlayer, { useTrackPlayerEvents, Event, Track } from 'react-native-track-player';

export const useCurrentTrack = () => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [nextTrack, setNextTrack] = useState(null);

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        if (event.type === Event.PlaybackActiveTrackChanged && event.nextTrack !== null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            setNextTrack(track);
        }
    });

    useEffect(() => {
        const fetchCurrentTrack = async () => {
            const currentTrackId = await TrackPlayer.getActiveTrackIndex();
            if (currentTrackId !== null) {
                const track = await TrackPlayer.getTrack(currentTrackId);
                setCurrentTrack(track);
            }
        };

        fetchCurrentTrack();
    }, []);

    return { currentTrack, nextTrack };
};

export default useCurrentTrack;
