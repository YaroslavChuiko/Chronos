import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetCalendarsQuery } from '~/store/api/apiSlice';
import ArrangementForm from '../Forms/ArrangementForm';
import ReminderForm from '../Forms/ReminderForm';
import TaskForm from '../Forms/TaskForm';

const CreateEventTabs = ({ onSuccess = null, selectedDate = null }) => {
  const [userCalendars, setUserCalendars] = useState([]);

  const { data } = useGetCalendarsQuery({ roles: ['admin', 'moderator'] });

  useEffect(() => {
    if (data) {
      setUserCalendars(data);
    }
  }, [data]);

  const arrangementValues = {
    start: selectedDate ? `${selectedDate}T06:00` : '',
    end: selectedDate ? `${selectedDate}T10:00` : '',
  };

  const taskValues = {
    date: selectedDate || '',
  };

  const reminderValues = {
    start: selectedDate ? `${selectedDate}T10:00` : '',
  };

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
            onSuccess={onSuccess}
            updatedValues={arrangementValues}
            userCalendars={userCalendars}
          />
        </TabPanel>
        <TabPanel>
          <TaskForm
            onSuccess={onSuccess}
            updatedValues={taskValues}
            userCalendars={userCalendars}
          />
        </TabPanel>
        <TabPanel>
          <ReminderForm
            onSuccess={onSuccess}
            updatedValues={reminderValues}
            userCalendars={userCalendars}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreateEventTabs;
