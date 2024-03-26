import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import config from "../../../config";
import tokenService from "@utils/tokenService";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_URL ,
        prepareHeaders: async (headers, { getState }) => {
            const token = await tokenService.getTokenFromStorage();

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        updateProfilePicture: builder.mutation({
            query: (imageData) => ({
                url: '/auth/me',
                method: 'POST',
                body: imageData,
            }),
            transformResponse: (response, meta, arg) => {
                return response;
            }
        }),

        claimStarDrops: builder.mutation({
            query: () => ({
                url: '/meta/star',
                method: 'POST',
            }),
            transformResponse: (response, meta, arg) => {
                return response;
            }
        }),

        resendPasswordCode: builder.mutation({
            query: (email) => ({
                url: '/auth/resend-code',
                method: 'POST',
            }),
            transformResponse: (response, meta, arg) => {
                return response;
            }
        }),
    }),
});

export const {
    useUpdateProfilePictureMutation,
    useClaimStarDropsMutation,
    useResendPasswordCodeMutation,
} = userApi;