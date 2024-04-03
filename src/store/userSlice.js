import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";
import { setAppIcon } from "expo-dynamic-app-icon";

export const saveColor = createAsyncThunk(
    'user/saveColor',
    async (color, { rejectWithValue }) => {
        try {
            const token = await tokenService.getTokenFromStorage();
            color = color.replace("#", "");
            await setAppIcon(color);
            return await authService.saveColor({ color, token });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateNotificationsEnabled = createAsyncThunk(
    'user/updateNotificationsEnabled',
    async (notifications_enabled, { rejectWithValue }) => {
        try {
            const token = await tokenService.getTokenFromStorage();
            return await authService.toggleNotifications({ notifications_enabled, token });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    isArtistMode: false,
    isLoggedIn: false,
    username: "",
    email: "",
    color: "#BB61C9",
    notifications_enabled: true,
    email_verified_at: null,
    profile_photo: {},
    errors: [],
    artist_profile: null,
    star_drops: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setArtistMode(state, action) {
            state.isArtistMode = action.payload;
        },
        setLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setUsername(state, action) {
            state.username = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setColor(state, action) {
            state.color = action.payload;
        },
        setUser(state, action) {
            const { username, email, color, star_drops, notifications_enabled, email_verified_at, artist_profile, profile_photo } = action.payload;
            state.username = username;
            state.email = email;
            state.color = color;
            state.star_drops = star_drops;
            state.notifications_enabled = notifications_enabled;
            state.email_verified_at = email_verified_at;
            state.artist_profile = artist_profile;
            state.profile_photo = profile_photo;
        },
        resetUser() {
            return initialState; // This ensures that the state is correctly reset to its initial form.
        },
        logOut(state) {
            Object.assign(state, initialState); // Alternatively, use Object.assign for resetting while keeping the same state reference.
        },
    },
    extraReducers: (builder) => {
        // Assuming authApi and userApi endpoints are defined elsewhere and correctly configured.
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;