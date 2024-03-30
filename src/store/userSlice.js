// src/store/userSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "@utils/authService";
import tokenService from "@utils/tokenService";
import {authApi} from "@store/api/auth";
import {userApi} from "@store/api/user";
import {musicApi} from "@store/api/music";


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
    isArtistMode: false,
    isLoggedIn: false,
    loading: false,
    username: "",
    email: "",
    color: "#BB61C9",
    notifications_enabled: true,
    email_verified_at: null,
    profile_photo: {},
    errors: [],
    artist_profile: null,
    star_drops: 0,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setArtistMode: (state, action) => {
            state.isArtistMode = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
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
            console.log('action.payload', action.payload)
            state.username = action.payload.username
            state.email = action.payload.email
            state.color = action.payload.color
            state.star_drops = action.payload.star_drops
            state.notifications_enabled = action.payload.notifications_enabled
            state.email_verified_at = action.payload.email_verified_at
            state.artist_profile = action.payload.artist_profile
            state.profile_photo = action.profile_photo
            console.error("pic update 1")
        },

        resetUser: (state) => {
            state = initialState
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.username = "";
            state.email = "";
            state.color = "#BB61C9";
            state.notifications_enabled = true;
            state.email_verified_at = null;
            state.artist_profile = null;
            state.profile_photo = {};
            console.error("pic update 2")
            state.star_drops = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action) => {
                console.log('action.payload', action.payload.user)
                state.isLoggedIn = true;
                state.username = action.payload.user.username
                state.email = action.payload.user.email
                state.color = action.payload.user.color
                state.notifications_enabled = action.payload.user.notifications_enabled
                state.email_verified_at = action.payload.user.email_verified_at
                state.artist_profile = action.payload.artist_profile
               state.star_drops = action.payload.user.star_drops
                state.profile_photo = action.payload.user.profile_photo
                console.error("pic update 3")
            })
            .addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.username = action.payload.user.username
                state.email = action.payload.user.email
                state.color = action.payload.user.color
                state.notifications_enabled = action.payload.user.notifications_enabled
                state.email_verified_at = action.payload.user.email_verified_at
                state.artist_profile = action.payload.artist_profile
                state.star_drops = action.payload.user.star_drops
                state.profile_photo = action.payload.user.profile_photo
                console.error("pic update 4")
            })

            .addMatcher(userApi.endpoints.updateProfilePicture.matchFulfilled, (state, action) => {
               console.log('action.payload',' action.payload', action.payload.user.profile_photo)
                state.profile_photo = action.payload.user.profile_photo
                console.error("pic update 5")
            })
            .addMatcher(userApi.endpoints.claimStarDrops.matchFulfilled, (state, action) => {
                state.star_drops = action.payload.user_star_drops

            })
            .addMatcher(musicApi.endpoints.starSong.matchFulfilled, (state, action) => {
                state.star_drops = action.payload.user_star_drops
            })
            .addMatcher(authApi.endpoints.changePassword.matchRejected, (state, action) => {
                // Handle rejected case
                state.errors =  action.payload.data.errors ?? action.payload.data; // or extract specific error message
                // You might want to update other state properties as well
            });
        // builder
        //     .addCase(saveColor.fulfilled, (state, action) => {
        //         state.loading = false;
        //     })
        //     .addCase(updateNotificationsEnabled.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.notifications_enabled = action.payload.user.notifications_enabled
        //     });
    },
});
export const userActions = {
    ...userSlice.actions,
};
export default userSlice.reducer;
