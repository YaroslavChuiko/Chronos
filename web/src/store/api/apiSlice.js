import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCalendars: builder.query({
      query: () => `/calendars`,
    }),
    getHolidays: builder.query({
      query: () => `/calendars/holidays`,
    }),
  }),
});

export const { useGetCalendarsQuery, useLazyGetHolidaysQuery } = apiSlice;
