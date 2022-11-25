import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useGetCalendarsQuery } from '~/store/api/apiSlice';
import CreateArrangementForm from '../Forms/CreateArrangementForm';
import CreateReminderForm from '../Forms/CreateReminderForm';
import CreateTaskForm from '../Forms/CreateTaskForm';

const CreateEventTabs = ({ onSuccess = null, selectedDate = null }) => {
  const { data: userCalendars = [] } = useGetCalendarsQuery({ roles: ['admin', 'moderator'] });

  return (
    <Tabs>
      <TabList>
        <Tab>Arrangement</Tab>
        <Tab>Task</Tab>
        <Tab>Reminder</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CreateArrangementForm
            onSuccess={onSuccess}
            selectedDate={selectedDate}
            userCalendars={userCalendars}
          />
        </TabPanel>
        <TabPanel>
          <CreateTaskForm
            onSuccess={onSuccess}
            selectedDate={selectedDate}
            userCalendars={userCalendars}
          />
        </TabPanel>
        <TabPanel>
          <CreateReminderForm
            onSuccess={onSuccess}
            selectedDate={selectedDate}
            userCalendars={userCalendars}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreateEventTabs;
