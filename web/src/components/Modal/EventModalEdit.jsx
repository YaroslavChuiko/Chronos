import { EVENT_TYPE_ENUM } from '~/consts/validation';
import UpdateArrangementForm from '../Forms/UpdateArrangementForm';
import UpdateReminderForm from '../Forms/UpdateReminderForm';
import UpdateTaskForm from '../Forms/UpdateTaskForm';

const EventModalEdit = ({ calendarId, eventId, eventInfo, onSuccess }) => {
  const info = {
    calendarId,
    eventId,
    title: eventInfo.event?._def.title,
    content: eventInfo.event?._def.extendedProps.content,
    start: eventInfo.event?.start,
    end: eventInfo.event?.end,
    color: eventInfo.event?.backgroundColor,
  };
  const type = eventInfo.event?._def.extendedProps.type;

  let eventForm;

  switch (type) {
    case EVENT_TYPE_ENUM.arrangement:
      eventForm = <UpdateArrangementForm event={info} onSuccess={onSuccess} />;
      break;

    case EVENT_TYPE_ENUM.task:
      eventForm = <UpdateTaskForm event={info} onSuccess={onSuccess} />;
      break;

    case EVENT_TYPE_ENUM.reminder:
      eventForm = <UpdateReminderForm event={info} onSuccess={onSuccess} />;
      break;

    default:
      break;
  }

  return <>{eventForm}</>;
};

export default EventModalEdit;
