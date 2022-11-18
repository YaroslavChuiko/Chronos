import { useEffect, useState } from 'react';
import { useGetCalendarEventsQuery } from '~/store/api/apiSlice';
import { toDate } from '~/utils/date';

const useGetEvents = ({ calendars, types }) => {
  const [events, setEvents] = useState([]);
  const { data, error } = useGetCalendarEventsQuery({ calendars, types });

  useEffect(() => {
    if (data) {
      const response = data.map((e) => ({
        id: e.id,
        title: e.name,
        start: toDate(e.startAt),
        end: toDate(e.endAt),
      }));
      setEvents(response);
    }
  }, [data]);

  return { events, eError: error };
};

export default useGetEvents;
