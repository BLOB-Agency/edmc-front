import { useDispatch } from 'react-redux';
import { eventsActions } from '@store/eventsSlice';

export const TrackableEvents = {
    Music: {
        Play: "PLAY_TRACK",
        Pause: "PAUSE_TRACK",
        Skip: "SKIP_TRACK",
        Seek: "SEEK_TRACK",
    },
    User: {
        Login: "LOGIN",
        Logout: "LOGOUT",
        Register: "REGISTER",
    }
}

const useTrackEvent = () => {
    const dispatch = useDispatch();

    return (eventData) => {
        if (!eventData || !eventData.subject) {
            // Handle the validation error as needed
            throw new Error('Invalid event data: subject is required');
        }

        dispatch(eventsActions.addEvent(eventData));
    };
};

export default useTrackEvent