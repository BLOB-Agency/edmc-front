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
            const featuredPlaylists = await musicService.fetchFeaturedPlaylists(token);
            return {
                recentAlbums: recentAlbums.albums,
                songs: songs.songs,
                featuredPlaylists: featuredPlaylists.playlists
            };
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
        recentAlbums: [],
        featuredPlaylists: []
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
                state.featuredPlaylists = action.payload.featuredPlaylists;
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