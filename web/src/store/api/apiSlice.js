import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCalendars: builder.query({
      query: () => `/calendars`,
    }),
  }),
});

export const { useGetCalendarsQuery } = apiSlice;
