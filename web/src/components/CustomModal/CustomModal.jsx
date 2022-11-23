import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const styles = { padding: '20px 30px' };

const CustomModal = ({ isOpen, onClose, header, children }) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader sx={styles}>{header}</ModalHeader>
      <ModalCloseButton />
      <ModalBody sx={styles}>{children}</ModalBody>
    </ModalContent>
  </Modal>
);

export default CustomModal;
