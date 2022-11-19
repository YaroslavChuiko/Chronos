import { useEffect, useState } from 'react';
import { useLazyGetHolidaysQuery } from '~/store/api/apiSlice';
import { getHolidayDate } from '~/utils/date';

const useGetHolidays = ({ hidden }) => {
  const [holidays, setHolidays] = useState([]);
  const [getHolidays, { data, isLoading, error }] = useLazyGetHolidaysQuery();

  useEffect(() => {
    if (!hidden) {
      !data && getHolidays();
    } else {
      setHolidays([]);
    }
  }, [hidden, getHolidays, data]);

  useEffect(() => {
    if (data && !hidden) {
      const response = data.map(({ name, start, end, ...h }) => ({
        title: name,
        start: getHolidayDate(start),
        end: getHolidayDate(end),
        ...h,
      }));
      setHolidays(response);
    }
  }, [data, hidden]);

  return { holidays, hLoading: isLoading, hError: error };
};

export default useGetHolidays;
