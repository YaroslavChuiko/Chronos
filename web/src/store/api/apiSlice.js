import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, setUser } from '../authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getCalendars: builder.query({
      query: () => `/calendars`,
    }),
    login: builder.mutation({
      query: ({ login, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { login, password },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setToken(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetCalendarsQuery, useLoginMutation } = apiSlice;
