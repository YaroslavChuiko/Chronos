import { useEffect, useState } from 'react';
import { useGetCalendarEventsQuery } from '~/store/api/apiSlice';

const useGetEvents = ({ calendars, types }) => {
  const [events, setEvents] = useState([]);
  const { data, error } = useGetCalendarEventsQuery({ calendars, types });

  useEffect(() => {
    if (data) {
      const response = data.map(({ name, start, end, ...e }) => ({
        title: name,
        start: start,
        end: end,
        ...e,
      }));
      setEvents(response);
    }
  }, [data]);

  return { events, eError: error };
};

export default useGetEvents;
