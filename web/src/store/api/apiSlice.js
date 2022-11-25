import { createApi } from '@reduxjs/toolkit/query/react';
import moment from 'moment';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Calendars',
    'Holidays',
    'Events',
    'CalendarInvited',
    'CalendarUsers',
    'EventInvited',
    'EventUsers',
  ],
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
    updateCalendarEvent: builder.mutation({
      query: ({ calendarId, eventId, name, content, color, start, end }) => ({
        url: `/calendars/${calendarId}/events/${eventId}`,
        method: 'PATCH',
        body: { name, content, color, start: moment(start).format(), end: moment(end).format() },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Events', id: arg.eventId }],
    }),
    deleteCalendarEvent: builder.mutation({
      query: ({ calendarId, eventId }) => ({
        url: `/calendars/${calendarId}/events/${eventId}`,
        method: 'DELETE',
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
    updateCalendar: builder.mutation({
      query: ({ id, body }) => ({
        url: `/calendars/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Calendars'],
    }),
    deleteCalendar: builder.mutation({
      query: (id) => ({
        url: `/calendars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Calendars'],
    }),
    shareCalendar: builder.mutation({
      query: ({ id, email }) => ({
        url: `calendars/${id}/invite`,
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['CalendarInvited', 'CalendarUsers'],
    }),
    getCalendarInvited: builder.query({
      query: (id) => `/calendars/${id}/invited`,
      providesTags: ['CalendarInvited'],
    }),
    getCalendarUsers: builder.query({
      query: (id) => `/calendars/${id}/users`,
      providesTags: ['CalendarUsers'],
    }),
    confirmCalendar: builder.mutation({
      query: ({ confirmToken }) => ({
        url: `/calendars/invite-confirm/${confirmToken}`,
        method: 'POST',
      }),
    }),
    shareEvent: builder.mutation({
      query: ({ id, email }) => ({
        url: `events/${id}/invite`,
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['EventInvited', 'EventUsers'],
    }),
    getEventInvited: builder.query({
      query: (id) => `/events/${id}/invited`,
      providesTags: ['EventInvited'],
    }),
    getEventUsers: builder.query({
      query: (id) => `/events/${id}/users`,
      providesTags: ['EventUsers'],
    }),
    confirmEvent: builder.mutation({
      query: ({ confirmToken }) => ({
        url: `/events/invite-confirm/${confirmToken}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetCalendarsQuery,
  useLazyGetHolidaysQuery,
  useGetCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useUpdateCalendarEventMutation,
  useDeleteCalendarEventMutation,
  useCreateCalendarMutation,
  useUpdateCalendarMutation,
  useDeleteCalendarMutation,
  useShareCalendarMutation,
  useGetCalendarInvitedQuery,
  useGetCalendarUsersQuery,
  useConfirmCalendarMutation,
  useConfirmEventMutation,
  useShareEventMutation,
  useGetEventUsersQuery,
  useGetEventInvitedQuery,
} = apiSlice;
