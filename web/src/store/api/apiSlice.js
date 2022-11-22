import { createApi } from '@reduxjs/toolkit/query/react';
import moment from 'moment';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getCalendars: builder.query({
      query: ({ roles } = { roles: [] }) => ({
        url: `/calendars`,
        params: {
          ...(roles.length && { roles: roles.join(',') }),
        },
      }),
      providesTags: ['Calendar'],
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
      providesTags: (result, _error, _arg) => {
        const events = result || [];
        return ['Event', ...events.map(({ id }) => ({ type: 'Event', id }))];
      },
    }),
    createCalendarEvent: builder.mutation({
      query: ({ calendar, name, content, color, start, end, type }) => ({
        url: `/calendars/${calendar}/events`,
        method: 'POST',
        body: {
          name,
          content,
          color,
          start: moment(start).format(),
          end: moment(end).format(),
          type,
        },
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  useGetCalendarsQuery,
  useLazyGetHolidaysQuery,
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
} = apiSlice;
