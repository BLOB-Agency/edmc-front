import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from "../../config";
import tokenService from "@utils/tokenService";

export const apiService = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_URL,
        // Add headers if needed, for example:
        prepareHeaders: async (headers, { getState }) => {
            const token = await tokenService.getTokenFromStorage();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: () => '/events', // Adjust this endpoint as needed
        }),
        // Add more endpoints as needed
    }),
});

export const { useGetEventsQuery } = apiService;
