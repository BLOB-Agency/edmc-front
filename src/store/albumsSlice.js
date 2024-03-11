import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TokenService from "@utils/tokenService";
import musicService from "@utils/musicService";
import {fetchHomeData} from "@store/homeSlice";

export const fetchSongsForAlbum = createAsyncThunk(
    'albums/fetchSongs',
    async (albumId, { getState }) => {
        const state = getState();
        if (state.albums.albums[albumId]) {
            return {albumId, album: state.albums.albums[albumId]}
        }

        const token = await TokenService.getTokenFromStorage();
                const response = await musicService.fetchAlbum(token, albumId, true)
                return {albumId, album: response.data};
    }
);

const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        entities: {},
        albums: {}
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchSongsForAlbum.fulfilled,
            (state, action) => {
                const { albumId, album } = action.payload;
                state.albums[albumId] = album;
            }
        ).addCase(
            fetchSongsForAlbum.rejected,
            (state, action) => {
                console.error(action.payload)
            }
        );
    },

});

export default albumsSlice.reducer;
