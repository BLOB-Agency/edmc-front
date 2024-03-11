import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenService from "@utils/tokenService";

export const metaApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "YOUR_BASE_URL",
        prepareHeaders: async (headers) => {
            const token = await tokenService.getTokenFromStorage();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        submitEvents: builder.mutation({
            query: (events) => ({
                url: '/submit-events',
                method: 'POST',
                body: events,
            }),
        }),
        // You can add more endpoints here
    }),
});

export const { useSubmitEventsMutation } = metaApi;
