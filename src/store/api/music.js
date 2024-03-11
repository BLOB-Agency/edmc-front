import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenService from "@utils/tokenService";
import config from "../../../config";

export const musicApi = createApi({
    reducerPath: 'musicApi',
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_URL,
        prepareHeaders: async (headers, { getState }) => {
            const token = await tokenService.getTokenFromStorage();

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchHomeData: builder.query({
            query: () => '/songs',
        }),
        fetchFeaturedPlaylists: builder.query({
            query: () => '/playlists',
            transformResponse: (response, meta, arg) => response.playlists,

        }),
        fetchAlbum: builder.query({
            query: ({ albumId, withMedia = false }) => `/albums/${albumId}?with_media=${withMedia}`,
        }),
        fetchPlaylist: builder.query({
            query: (playlistId) => `/playlists/${playlistId}`,
            transformResponse: (response, meta, arg) => response.playlist,

        }),

        fetchPublicPlaylists: builder.query({
            query: () => `/playlists?type=public`,
            transformResponse: (response, meta, arg) => response.playlists,

        }),

        fetchRecentAlbums: builder.query({
            query: () => '/albums/recent',
        }),
        fetchMyTracks: builder.query({
            query: () => '/songs/mine',
            transformResponse: (response, meta, arg) => response.songs,
        }),
        reportTrack: builder.mutation({
            query: ({ trackId, reason }) => ({
                url: `/songs/${trackId}/report`,
                method: 'POST',
                body: { reason },
            }),
        }),
        likeSong: builder.mutation({
            query: (songId) => ({
                url: `/songs/${songId}/like`,
                method: 'POST',
            }),
            onQueryStarted: async (songId, { queryFulfilled, dispatch, getState }) => {
                const updateOptimistically = (songs, songId) => {
                    const songIndex = songs.findIndex(song => song.id === songId);
                    if (songIndex > -1) {
                        const song = songs[songIndex];
                        song.liked = !song.liked; // Toggle like status
                        song.likes_count += song.liked ? 1 : -1; // Adjust likes_count based on the new liked status
                        // If toggling like also means un-disliking:
                        song.disliked = false;
                    }
                };

                const patchResults = [
                    dispatch(
                        musicApi.util.updateQueryData('fetchMyTracks', undefined, draft => {
                            if (draft && Array.isArray(draft)) { // Ensure draft is an array
                                updateOptimistically(draft, songId);
                            }
                        })
                    ),
                    dispatch(
                        musicApi.util.updateQueryData('fetchHomeData', undefined, draft => {
                            if (draft && Array.isArray(draft.songs)) { // Ensure draft.songs is an array
                                updateOptimistically(draft.songs, songId);
                            }
                        })
                    )
                    // Add additional dispatches here for other queries if needed
                ];

                try {
                    await queryFulfilled;
                } catch {
                    patchResults.forEach(patch => patch.undo());
                }
            },
        }),

        dislikeSong: builder.mutation({
            query: (songId) => ({
                url: `/songs/${songId}/dislike`,
                method: 'POST',
            }),
            onQueryStarted: async (songId, { queryFulfilled, dispatch, getState }) => {
                const updateOptimistically = (songs, songId) => {
                    const songIndex = songs.findIndex(song => song.id === songId);
                    if (songIndex > -1) {
                        const song = songs[songIndex];
                        song.disliked = !song.disliked; // Toggle dislike status
                        // Optionally adjust likes_count or dislikes_count based on your app's logic
                        // For example, decrementing likes_count if disliked is now true
                        song.liked = false; // Assuming a song can't be liked and disliked at the same time
                    }
                };

                const patchResults = [
                    dispatch(
                        musicApi.util.updateQueryData('fetchMyTracks', undefined, draft => {
                            if (draft && Array.isArray(draft)) { // Ensure draft is an array
                                updateOptimistically(draft, songId);
                            }
                        })
                    ),
                    dispatch(
                        musicApi.util.updateQueryData('fetchHomeData', undefined, draft => {
                            if (draft && Array.isArray(draft.songs)) { // Ensure draft.songs is an array
                                updateOptimistically(draft.songs, songId);
                            }
                        })
                    )
                    // Add additional dispatches here for other queries if needed
                ];

                try {
                    await queryFulfilled;
                } catch {
                    patchResults.forEach(patch => patch.undo());
                }
            },
        }),


    }),


});

export const {
    useFetchHomeDataQuery,
    useFetchAlbumQuery,
    useFetchRecentAlbumsQuery,
    useFetchFeaturedPlaylistsQuery,
    useFetchMyTracksQuery, // Export the hook for your new query
    useReportTrackMutation,
    useLikeSongMutation,
    useDislikeSongMutation,
    useFetchPlaylistQuery,
    useFetchPublicPlaylistsQuery,
} = musicApi;
