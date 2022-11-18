import { Flex } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Sidebar from "~/components/Sidebar/Sidebar";
import { CALENDAR_OPTIONS as OPTIONS } from "~/consts/calendar";
import styles from "./main.styles";
import "~/styles/full-calendar.css";

const CalendarPage = () => {
  return (
    <Flex css={styles.container}>
      <Sidebar />
      <Flex css={styles.calendar}>
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
