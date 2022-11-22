import { createApi } from '@reduxjs/toolkit/query/react';
import moment from 'moment';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Calendars', 'Holidays', 'Events'],
  endpoints: (builder) => ({
    getCalendars: builder.query({
      query: ({ roles } = { roles: [] }) => ({
        url: `/calendars`,
        params: {
          ...(roles.length && { roles: roles.join(',') }),
        },
      }),
      providesTags: ['Calendars'],
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
        return ['Events', ...events.map(({ id }) => ({ type: 'Events', id }))];
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
      invalidatesTags: ['Events'],
    }),
    createCalendar: builder.mutation({
      query: (body) => ({
        url: `/calendars`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Calendars'],
    }),
    deleteCalendar: builder.mutation({
      query: (id) => ({
        url: `/calendars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Calendars', 'Events'],
    }),
  }),
});

export const {
  useGetCalendarsQuery,
  useLazyGetHolidaysQuery,
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useCreateCalendarMutation,
  useDeleteCalendarMutation,
} = apiSlice;
