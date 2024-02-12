import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";

export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (userData, { rejectWithValue }) => {
        try {
            const token = await tokenService.getTokenFromStorage();
            return await authService.verifyEmail({token, userData});
        } catch (error) {
            return rejectWithValue(JSON.parse(error.message));
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        logOut(state) {
            state.isLoggedIn = false;
        }
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
