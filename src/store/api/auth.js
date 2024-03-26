import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenService from "@utils/tokenService";
import config from "../../../config";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData,
            }),
            transformResponse: async (response, meta, arg) => {
                await tokenService.setTokenInStorage(response.access_token);
                return response;
            }
        }),


        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            transformResponse: async (response, meta, arg) => {
                await tokenService.setTokenInStorage(response.access_token);
                return response;
            }
        }),
        changePassword: builder.mutation({
            query: (passwordData) => ({
                url: '/auth/change-password',
                method: 'PUT',
                body: passwordData,
            }),
            transformResponse: (response, meta, arg) => {
                return response;
            }
        }),

    }),
});


export const { useLoginUserMutation,
    useRegisterUserMutation,
    useChangePasswordMutation,

} = authApi;