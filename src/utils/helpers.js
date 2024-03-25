import TrackPlayer from "react-native-track-player";
import {usePlayerEventEmitter} from "@utils/emitters";
import useTrackEvent, {TrackableEvents} from "@utils/hooks/useTrackEvent";

function formatNamesWithAnd(array) {
    if (array.length === 0) {
        return '';
    }

    const names = array.map(obj => obj.username);

    if (names.length === 1) {
        return names[0];
    }

    const allButLast = names.slice(0, -1).join(", ");
    const lastName = names[names.length - 1];

    return `${allButLast} & ${lastName}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${paddedSeconds}`;
}

const getTotalDurationInMinutes = (songs) => {
    const totalDurationInSeconds = songs.reduce((sum, song) => sum + song.duration, 0);
    return Math.round(totalDurationInSeconds / 60);
};

const playSingleTrack = async (song) => {


    const playerEventEmitter = usePlayerEventEmitter();
    const track = {
        url: song.media[0].url,
        title: song.title,
        artist: song.artists[0].name,
        artwork: song.cover_image.url,
        duration: song.duration,
    }

    await TrackPlayer.reset();
    await TrackPlayer.add([track]);
    await TrackPlayer.play();


    playerEventEmitter.emit('openPlayer');
}


const playMultipleTracks = async (songs) => {
    const playerEventEmitter = usePlayerEventEmitter();
    const trackEvent = useTrackEvent();
    const tracks = songs.map(song => ({
        url: song.media[0].url,
        title: song.title,
        artist: song.artists[0].name,
        artwork: song.cover_image[0].url,
        duration: song.duration,
    }));

    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.play();
    trackEvent(TrackableEvents.Music.Play, {
        track_id: song.id,
    });
    playerEventEmitter.emit('openPlayer');
}

export {
    formatNamesWithAnd, formatTime, getTotalDurationInMinutes, playSingleTrack, playMultipleTracks
}