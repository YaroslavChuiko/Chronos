import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import Layout from "../Layout/Layout";
import styles from "./page-alert.styles";

const PageAlert = ({ status, message, children }) => (
  <Layout>
    <Alert status={status} variant="top-accent" sx={styles.container}>
      <AlertIcon boxSize="40px" mr={0} />
      <Text mt={4} mb={1} fontSize="3xl">
        {message}
      </Text>
      {children && <div style={{ marginTop: 10 }}>{children}</div>}
    </Alert>
  </Layout>
);

export default PageAlert;
