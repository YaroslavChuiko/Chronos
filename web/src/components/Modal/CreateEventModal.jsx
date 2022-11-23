import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import CreateEventTabs from '../Tabs/CreateEventTabs';

const CreateEventModal = ({ isOpen, onClose, selectedDate }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create an event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateEventTabs onClose={onClose} selectedDate={selectedDate} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateEventModal;
