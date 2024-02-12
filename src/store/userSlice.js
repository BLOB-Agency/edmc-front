// src/store/userSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";


export const saveColor = createAsyncThunk(
    'user/saveColor',
    async (color, {rejectWithValue}) => {
        try {
            const token = await tokenService.getTokenFromStorage();

            return await authService.saveColor({color, token})
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateNotificationsEnabled = createAsyncThunk(
    'user/updateNotificationsEnabled',
    async (notifications_enabled, {rejectWithValue}) => {
        try {
            const token = await tokenService.getTokenFromStorage();

            return await authService.toggleNotifications({notifications_enabled, token})
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const initialState = {
    loading: false,
    username: "",
    email: "",
    color: "#BB61C9",
    notifications_enabled: true,
    email_verified_at: null,
    errors: [],

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setColor: (state, action) => {
            state.color = action.payload;
        },

        setUser: (state, action) => {
            console.log('user', action.payload)
            state.username = action.payload.username
            state.email = action.payload.email
            state.color = action.payload.color
            state.notifications_enabled = action.payload.notifications_enabled
            state.email_verified_at = action.payload.email_verified_at
        },

        resetUser: (state) => {
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveColor.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateNotificationsEnabled.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications_enabled = action.payload.user.notifications_enabled
            });
    },
});
export const userActions = {
    ...userSlice.actions,
};
export default userSlice.reducer;
