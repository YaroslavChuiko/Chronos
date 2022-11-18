import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from '~/components/Sidebar/Sidebar';
import { CALENDAR_OPTIONS as OPTIONS } from '~/consts/calendar';
import styles from './calendars.styles';
import '~/styles/full-calendar.css';
import { useGetCalendarsQuery } from '~/store/api/apiSlice';
import Loader from '~/components/Loader/Loader';
import PageAlert from '~/components/PageAlert/PageAlert';

const CalendarPage = () => {
  const [calendars, setCalendars] = useState([]);
  const { data, isLoading, error } = useGetCalendarsQuery();

  useEffect(() => {
    if (data) {
      setCalendars(data);
    }
  }, [data]);

  if (error) {
    return <PageAlert status="error" message={error.data.message} />;
  }

  if (isLoading || !calendars.length) {
    return <Loader />;
  }

  return (
    <Flex sx={styles.container}>
      <Sidebar calendars={calendars} />
      <Flex sx={styles.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView={OPTIONS.initialView}
          headerToolbar={OPTIONS.toolbar}
        />
      </Flex>
    </Flex>
  );
};

export default CalendarPage;
