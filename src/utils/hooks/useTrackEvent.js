import { useDispatch } from 'react-redux';
import { eventsActions } from '@store/eventsSlice';
import Joi from "joi";

export const TrackableEvents = {
    Player: {
        Init: "INIT_PLAYER",
    },
    Social: {
        Share: "SHARE",
        Like: "LIKE",
        Dislike: "DISLIKE",
    },
    Music: {
        Play: "PLAY_TRACK",
        Pause: "PAUSE_TRACK",
        SkipNext: "SKIP_NEXT_TRACK",
        SkipPrevious: "SKIP_PREVIOUS_TRACK",
        Seek: "SEEK_TRACK",
        GoToAlbum: "GO_TO_ALBUM",
        GoToArtist: "GO_TO_ARTIST",
    },
    Auth: {
        Login: "LOGIN",
        Logout: "LOGOUT",
        Register: "REGISTER",
    },
    Ui: {
        ChangeColor: "CHANGE_COLOR",
    }
}

const actionSubjectMap = {};
for (const subject in TrackableEvents) {
    Object.values(TrackableEvents[subject]).forEach(action => {
        actionSubjectMap[action] = subject;
    });
}

const eventSchema = Joi.object({
    action: Joi.string().valid(...Object.keys(actionSubjectMap)).required(),
    subject: Joi.string().valid(...Object.keys(TrackableEvents)).required(),
    metadata: Joi.object(),
});

const useTrackEvent = () => {
    const dispatch = useDispatch();

    return (action, additionalData = {}) => {
        const eventData = {
            action,
            subject: actionSubjectMap[action],
            metadata: additionalData
        };

        const { error } = eventSchema.validate(eventData);

        if (error) {
            throw new Error(`Invalid event data: ${error.message}`);
        }

        dispatch(eventsActions.addEvent(eventData));
    };
};

export default useTrackEvent;