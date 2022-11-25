import { useEffect, useState } from 'react';
import { useGetCalendarEventsQuery } from '~/store/api/apiSlice';

const useGetEvents = ({ calendars, types }) => {
  const [events, setEvents] = useState([]);
  const { data, error } = useGetCalendarEventsQuery({ calendars, types });

  useEffect(() => {
    if (data) {
      const response = data.map(({ name, ...e }) => ({
        title: name,
        ...e,
      }));
      setEvents(response);
    }
  }, [data]);

  return { events, eError: error };
};

export default useGetEvents;
