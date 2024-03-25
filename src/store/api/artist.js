import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from "../../../config";
import tokenService from "@utils/tokenService";

export const artistApi = createApi({
    reducerPath: 'artistApi',
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
        getNewArtists: builder.query({
            query: () => 'artist-profile/new',
            transformResponse: (response) => {
                console.log('response', response)

                return response.artists;
            },
        }),
        getArtistProfile: builder.query({
            query: (artistId) => `artist-profile/${artistId}`,
            transformResponse: (response) => {
                return {...response.artist_profile, songs: response.songs, latest: response.latest};
            },
        }),

        createArtistProfile: builder.mutation({
            query: (artistData) => ({
                url: '/artist-profile',
                method: 'POST',
                body: artistData,
            }),
            transformResponse: (response, meta, arg) => {
                return response;
            }
        }),
    }),
});

export const {
    useGetArtistProfileQuery,
    useGetNewArtistsQuery,
    useCreateArtistProfileMutation
} = artistApi;
