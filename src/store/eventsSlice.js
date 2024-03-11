import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import musicService from "@utils/musicService";
import tokenService from "@utils/tokenService";
import eventsService from "@utils/eventsService";


export const sendEventsToServer = createAsyncThunk(
    'events/sendEventsToServer',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState(); // Access the current state
            const events = state.events.events; // Assuming this is the path to your events

            if (events.length === 0) {
                                return; // No events to send
            }

            const token = await tokenService.getTokenFromStorage();
            const response = await eventsService.submitEvents(events, token);
                        thunkAPI.dispatch(eventsActions.clearEvents());
        } catch (error) {
            console.error('Error sending events to server:', error);
            // Handle the error appropriately
        }
    }
);



export const eventsSlice = createSlice({
    name: "events",
    initialState: {
        loading: false,
        events: []
    },
    reducers: {
        addEvent: (state, action) => {

            state.events.push({
                ...action.payload,
                timestamp: new Date().toISOString(),
            });
        },
        clearEvents: (state) => {
            state.events = [];
        },
    },
    extraReducers: (builder) => {

    },
})

export const eventsActions = eventsSlice.actions;
export default eventsSlice.reducer;