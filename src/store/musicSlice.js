import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    timer: 0,
    isPlaying: false,
    timeUntilNextStar: 300,
};

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setTimer: (state, action) => {
            state.timer = action.payload;
            state.timeUntilNextStar = 300 - (state.timer % 300);
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        reset: (state) => {
            state.timer = 0;
            state.isPlaying = false;
            state.timeUntilNextStar = 300;
        },
    },
});

// Export actions
export const { reset, setTimer, setIsPlaying } = musicSlice.actions;

export const musicActions = {
    reset,
    setTimer,
    setIsPlaying,
};
// Export reducer
export default musicSlice.reducer;
