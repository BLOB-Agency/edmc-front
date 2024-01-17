import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import musicService from "@utils/musicService";
import tokenService from "@utils/tokenService";

export const fetchHomeData = createAsyncThunk(
    'home/fetchHomeData',
    async (_, { rejectWithValue }) => {
        try {
            const token = await tokenService.getTokenFromStorage();

            const result = await musicService.fetchHomeData(token);
            console.log('result', result)

            return result.songs;
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
    },
    reducers: {
        setSongs: (state, action) => {
            state.songs = action.payload;
        },
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
                state.songs = action.payload;
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