import {
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
import { useEffect, useState } from 'react';
import { useGetCalendarsQuery } from '~/store/api/apiSlice';
import ArrangementForm from './ArrangementForm';
import TaskForm from './TaskForm';

const CreateEventModal = ({ isOpen, onClose, selectedDate }) => {
  const [userCalendars, setUserCalendars] = useState([]);

  const { data } = useGetCalendarsQuery({ roles: ['admin', 'moderator'] });

  useEffect(() => {
    if (data) {
      setUserCalendars(data);
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                <ArrangementForm
                  onClose={onClose}
                  initialDate={selectedDate}
                  userCalrndars={userCalendars}
                />
              </TabPanel>
              <TabPanel>
                <TaskForm
                  onClose={onClose}
                  initialDate={selectedDate}
                  userCalrndars={userCalendars}
                />
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateEventModal;
