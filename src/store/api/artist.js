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
        getArtistProfile: builder.query({
            query: (artistId) => `artist-profile/${artistId}`,
            transformResponse: (response) => response.artist_profile,
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

export const { useGetArtistProfileQuery, useCreateArtistProfileMutation } = artistApi;
