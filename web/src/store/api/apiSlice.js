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
    getCalendarEvents: builder.query({
      query: ({ calendars, types }) => ({
        url: `/events`,
        params: {
          ...(calendars.length && { calendars: calendars.join(',') }),
          ...(types.length && { types: types.join(',') }),
        },
      }),
    }),
  }),
});

export const { useGetCalendarsQuery, useLazyGetHolidaysQuery, useGetCalendarEventsQuery } =
  apiSlice;
