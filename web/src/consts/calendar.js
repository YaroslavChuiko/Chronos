export const CALENDAR_OPTIONS = {
  toolbar: {
    center: 'dayGridDay,dayGridWeek,dayGridMonth',
  },
  initialView: 'dayGridMonth',
};

export const CALENDAR_SECTIONS = {
  my: 'My Calendars',
  other: 'Other Calendars',
  types: 'Calendar Types',
};

export const CALENDAR_FILTER = {
  holidays: 'Holidays',
  types: [
    { id: 'arrangement', name: 'Arrangements' },
    {
      id: 'task',
      name: 'Tasks',
    },
    { id: 'reminder', name: 'Reminders' },
  ],
};
