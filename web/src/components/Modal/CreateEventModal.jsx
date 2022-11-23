import CustomModal from '../CustomModal/CustomModal';
import CreateEventTabs from '../Tabs/CreateEventTabs';

const CreateEventModal = ({ isOpen, onClose, selectedDate }) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} header="Create an event">
      <CreateEventTabs onSuccess={onClose} selectedDate={selectedDate} />
    </CustomModal>
  );
};

export default CreateEventModal;
