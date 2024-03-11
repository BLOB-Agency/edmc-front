import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";
import {authApi} from "@store/api/auth";



export const registrationSlice = createSlice({
    name: "registration",
    initialState: {
        loading: false,
        is_artist: false,
        username: "",
        email: "",
        password: "",
        errors: [],
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setIsArtist: (state, action) => {
            state.is_artist = action.payload;
        },
        resetUser: (state) => {
            state.username = "";
            state.email = "";
            state.password = "";
            state.is_artist = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.registerUser.matchRejected, (state, action) => {
                                state.errors =  action.payload.data.errors ?? action.payload.data; // or extract specific error message
            });
    }
});
export const registrationActions = {
    ...registrationSlice.actions,
};
export default registrationSlice.reducer;
