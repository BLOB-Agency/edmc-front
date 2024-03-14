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
        // You can add more reducers as needed for handling other music-related actions
    },
});

// Export actions
export const { setTimer, setIsPlaying } = musicSlice.actions;

// Export reducer
export default musicSlice.reducer;
