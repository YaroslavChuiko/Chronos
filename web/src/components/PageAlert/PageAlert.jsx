import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";
import styles from "./page-alert.styles";

const PageAlert = ({ status, message, children }) => (
  <Flex css={styles.page}>
    <Alert status={status} variant="top-accent" css={styles.container}>
      <AlertIcon boxSize="40px" mr={0} />
      <Text mt={4} mb={1} fontSize="3xl">
        {message}
      </Text>
      {children && <div style={{ marginTop: 10 }}>{children}</div>}
    </Alert>
  </Flex>
);

export default PageAlert;
