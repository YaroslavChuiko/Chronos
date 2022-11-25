import { useEffect, useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Sidebar from '~/components/Sidebar/Sidebar';
import { CALENDAR_OPTIONS as OPTIONS } from '~/consts/calendar';
import styles from './calendars.styles';
import '~/styles/full-calendar.css';
import { useGetCalendarsQuery } from '~/store/api/apiSlice';
import Loader from '~/components/Loader/Loader';
import PageAlert from '~/components/PageAlert/PageAlert';
import useGetHolidays from '~/hooks/use-get-holidays';
import { colors } from '~/consts/theme';
import useGetEvents from '~/hooks/use-get-events';
import CreateEventModal from '~/components/Modal/CreateEventModal';
import EventModal from '~/components/Modal/EventModal';

const CalendarPage = () => {
  const [calendars, setCalendars] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [filter, setFilter] = useState({
    calendars: [],
    types: [],
    holidays: true,
  });
  const { data, isLoading, error: cError } = useGetCalendarsQuery();
  const { holidays, hError, hLoading } = useGetHolidays({ hidden: !filter.holidays });
  const { events, eError } = useGetEvents({
    calendars: filter.calendars,
    types: filter.types,
  });

  useEffect(() => {
    if (data) {
      setCalendars(data);
    }
  }, [data]);

  useEffect(() => {
    setEventData([...events, ...holidays]);
  }, [events, holidays]);

  const {
    isOpen: isCreateEventOpen,
    onOpen: onCreateEventOpen,
    onClose: onCreateEventClose,
  } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState('');

  const onDateClick = (info) => {
    setSelectedDate(info.dateStr);
    onCreateEventOpen();
  };

  const {
    isOpen: isShowEventOpen,
    onOpen: onShowEventOpen,
    onClose: onShowEventClose,
  } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState({});

  const onEventClick = (info) => {
    setSelectedEvent(info);
    onShowEventOpen();
  };

  const error = cError || hError || eError;
  if (error) {
    return <PageAlert status="error" message={error.data.message} />;
  }

  if (isLoading || !calendars.length || hLoading) {
    return <Loader />;
  }

  return (
    <Flex sx={styles.container}>
      <Sidebar setFilter={setFilter} calendars={calendars} />
      <Flex sx={styles.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={onDateClick}
          eventClick={onEventClick}
          initialView={OPTIONS.initialView}
          headerToolbar={OPTIONS.toolbar}
          events={eventData}
          eventBackgroundColor={colors.yellow[400]}
          eventBorderColor={colors.yellow[400]}
        />
        <CreateEventModal
          isOpen={isCreateEventOpen}
          onClose={onCreateEventClose}
          selectedDate={selectedDate}
        />
        <EventModal isOpen={isShowEventOpen} onClose={onShowEventClose} eventInfo={selectedEvent} />
      </Flex>
    </Flex>
  );
};

export default CalendarPage;
