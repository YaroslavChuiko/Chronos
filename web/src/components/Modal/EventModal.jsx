import { useState } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import EventModalControls from './EventModalControls';
import EventModalEdit from './EventModalEdit';
import EventModalShow from './EventModalShow';

const EventModal = ({ isOpen, onClose, eventInfo }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const calendarId = eventInfo.event?._def.extendedProps.calendarId;
  const eventId = eventInfo.event?.id;
  const eventType = eventInfo.event?._def.extendedProps.type;
  const userRole = eventInfo.event?._def.extendedProps.role;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      header={isEditMode ? 'Edit event info' : 'Event info'}
    >
      {eventType !== 'holiday' && (
        <EventModalControls
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          onClose={onClose}
          calendarId={calendarId}
          eventId={eventId}
          userRole={userRole}
        />
      )}

      {isEditMode ? (
        <EventModalEdit
          calendarId={calendarId}
          eventId={eventId}
          eventInfo={eventInfo}
          onSuccess={onClose}
        />
      ) : (
        <EventModalShow eventInfo={eventInfo} />
      )}
    </CustomModal>
  );
};

export default EventModal;
