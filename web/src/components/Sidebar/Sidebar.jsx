import { Avatar, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { AddIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import MyCalendars from '~/components/Calendar/MyCalendars/MyCalendars';
import useCustomToast from '~/hooks/use-custom-toast.js';
import { useLogoutMutation } from '~/store/api/authSlice.js';
import ConfirmPopover from '../CustomPopover/ConfirmPopover.jsx';
import styles from './sidebar.styles.js';

const Sidebar = ({ calendars, setFilter }) => {
  const { user } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Button
            leftIcon={<AddIcon />}
            as={RouterLink}
            to="/createEvent"
            colorScheme="green"
            variant="outline"
            size="lg"
          >
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
          <ConfirmPopover
            header="Are you sure you want to logout?"
            trigger={
              <Button
                onClick={onOpen}
                isLoading={isLoading}
                size="sm"
                colorScheme="red"
                variant="outline"
              >
                Logout
              </Button>
            }
            onConfirm={logoutHandler}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
