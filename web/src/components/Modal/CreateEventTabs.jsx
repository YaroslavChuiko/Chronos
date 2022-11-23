import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetCalendarsQuery } from '~/store/api/apiSlice';
import ArrangementForm from './ArrangementForm';
import ReminderForm from './ReminderForm';
import TaskForm from './TaskForm';

const CreateEventTabs = ({ onClose = null, selectedDate = null }) => {
  const [userCalendars, setUserCalendars] = useState([]);

  const { data } = useGetCalendarsQuery({ roles: ['admin', 'moderator'] });

  useEffect(() => {
    if (data) {
      setUserCalendars(data);
    }
  }, [data]);

  return (
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
            userCalendars={userCalendars}
          />
        </TabPanel>
        <TabPanel>
          <TaskForm onClose={onClose} initialDate={selectedDate} userCalendars={userCalendars} />
        </TabPanel>
        <TabPanel>
          <ReminderForm
            onClose={onClose}
            initialDate={selectedDate}
            userCalendars={userCalendars}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreateEventTabs;
