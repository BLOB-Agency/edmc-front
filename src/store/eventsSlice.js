import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import musicService from "@utils/musicService";
import tokenService from "@utils/tokenService";

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