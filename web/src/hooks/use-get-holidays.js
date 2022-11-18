import { useEffect, useState } from 'react';
import { useLazyGetHolidaysQuery } from '~/store/api/apiSlice';
import { getDate } from '~/utils/date';

const useGetHolidays = ({ hidden }) => {
  const [holidays, setHolidays] = useState([]);
  const [getHolidays, { data, isLoading, error }] = useLazyGetHolidaysQuery();

  useEffect(() => {
    if (!hidden) {
      getHolidays();
    }
  }, [hidden, getHolidays]);

  useEffect(() => {
    if (data) {
      const response = data.map((h) => ({
        title: h.name,
        start: getDate(h.startAt),
        end: getDate(h.startAt),
      }));
      setHolidays(response);
    }
  }, [data]);

  return { holidays, hLoading: isLoading, hError: error };
};

export default useGetHolidays;
