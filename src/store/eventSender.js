import {sendEventsToServer} from "@store/eventsSlice";

export const periodicEventSender = store => {
    // Function to send events

    const sendEvents = () => {
        const state = store.getState();
        const events = state.events.events;

        if (events.length > 0) {
                        store.dispatch(sendEventsToServer(events));
        }
    };

    // Send events immediately when the app starts
    setTimeout(sendEvents, 1000);

    // Set an interval for sending events periodically
    const interval = setInterval(sendEvents, 600000); // 10 minutes

    return next => action => {
        return next(action);
    };
};
