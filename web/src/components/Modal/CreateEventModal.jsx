import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRef } from 'react';
import ArrangementForm from './ArrangementForm';

const CreateEventModal = ({ isOpen, onClose, selectedDate }) => {
  const initialRef = useRef(null);
  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create an event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Arrangement</Tab>
              <Tab>Task</Tab>
              <Tab>Reminder</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ArrangementForm onClose={onClose} initialDate={selectedDate} />
              </TabPanel>
              <TabPanel>
                <FormControl mt={4}>
                  <FormLabel>Start at</FormLabel>
                  <Input placeholder="Select Date and Time" size="md" type="datetime-local" />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default CreateEventModal;
