import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import MyCalendars from '~/components/Calendar/MyCalendars/MyCalendars';
import useCustomToast from '~/hooks/use-custom-toast.js';
import { useLogoutMutation } from '~/store/api/authSlice.js';
import styles from './sidebar.styles.js';

const Sidebar = ({ calendars, setFilter }) => {
  const { user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const { toast } = useCustomToast();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      toast(error.data.message);
    }
  };

  return (
    <Flex sx={styles.sidebar} borderColor="gray.200">
      <Flex sx={styles.container}>
        <Flex>
          <Button sx={styles.btn} bg="yellow.400" size="lg">
            Create an event
          </Button>
        </Flex>
        <MyCalendars setFilter={setFilter} calendars={calendars} />
        <Flex sx={styles.user} bgColor="gray.100">
          <Flex sx={{ alignItems: 'center' }}>
            <Avatar name={user.login} bg="yellow.400" />
            <Text size="lg" sx={styles.userLogin}>
              {user.login}
            </Text>
          </Flex>
          <Button
            onClick={logoutHandler}
            isLoading={isLoading}
            size="sm"
            colorScheme="red"
            variant="outline"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
