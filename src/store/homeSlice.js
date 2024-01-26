import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import musicService from "@utils/musicService";
import tokenService from "@utils/tokenService";

export const fetchHomeData = createAsyncThunk(
    'home/fetchHomeData',
    async (_, { rejectWithValue }) => {
        try {
            const token = await tokenService.getTokenFromStorage();
            const songs = await musicService.fetchHomeData(token)
            const recentAlbums = await musicService.fetchRecentAlbums(token);
            return {recentAlbums: recentAlbums.albums, songs: songs.songs};
        } catch (error) {
            return rejectWithValue(JSON.parse(error.message));
        }
    }
);

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        loading: false,
        errors: [],
        songs: [],
        recentAlbums: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchHomeData.pending,
            (state) => {
                state.loading = true;
            }
        ).addCase(
            fetchHomeData.fulfilled,
            (state, action) => {
                state.loading = false;
                state.recentAlbums = action.payload.recentAlbums;
                state.songs = action.payload.songs;
            }
        ).addCase(
            fetchHomeData.rejected,
            (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            }
        );
    },
})

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;