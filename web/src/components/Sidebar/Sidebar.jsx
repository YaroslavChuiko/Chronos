import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MyCalendars from "~/components/Calendar/MyCalendars/MyCalendars";
import styles from "./sidebar.styles.js";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Flex css={styles.sidebar}>
      <Flex css={styles.container}>
        <Flex>
          <Button css={styles.btn} bg="yellow.400" size="lg">
            Create an event
          </Button>
        </Flex>
        <MyCalendars />
        <Flex css={styles.user}>
          <Avatar name={user.login} bg="yellow.400" />
          <Text size="lg" css={styles.userLogin}>
            {user.login}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
