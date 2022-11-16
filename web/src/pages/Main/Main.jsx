import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarPage = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 50,
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ center: "dayGridDay,dayGridWeek,dayGridMonth" }}
        dayHeaders={true}
        events={[
          { title: "event 1", date: "2022-11-02", allDay: false },
          { title: "event 2", date: "2022-11-02" },
        ]}
      />
    </div>
  );
};

export default CalendarPage;
