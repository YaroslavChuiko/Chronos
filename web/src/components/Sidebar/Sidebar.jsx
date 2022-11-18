import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import MyCalendars from '~/components/Calendar/MyCalendars/MyCalendars';
import styles from './sidebar.styles.js';

const Sidebar = ({ calendars, setCalendarIDs }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Flex sx={styles.sidebar} borderColor="gray.200">
      <Flex sx={styles.container}>
        <Flex>
          <Button sx={styles.btn} bg="yellow.400" size="lg">
            Create an event
          </Button>
        </Flex>
        <MyCalendars setCalendarIDs={setCalendarIDs} calendars={calendars} />
        <Flex sx={styles.user} bgColor="gray.100">
          <Avatar name={user.login} bg="yellow.400" />
          <Text size="lg" sx={styles.userLogin}>
            {user.login}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
