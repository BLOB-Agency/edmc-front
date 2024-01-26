import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";

export const registerUser = createAsyncThunk(
    'registration/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authService.createUser(userData)
            await tokenService.setTokenInStorage(response.access_token);

            return response;
        } catch (error) {
            return rejectWithValue(JSON.parse(error.message));
        }
    }
);


export const registrationSlice = createSlice({
    name: "registration",
    initialState: {
        loading: false,
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
            state.email = action.payload
        },
        resetUser: (state) => {
            state.username = "";
            state.email = "";
            state.password = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
    },
});
export const registrationActions = {
    ...registrationSlice.actions,
    registerUser
};
export default registrationSlice.reducer;
