import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';
import Layout from '../Layout/Layout';
import styles from './page-alert.styles';

const PageAlert = ({ status, title = null, message, children }) => (
  <Layout>
    <Alert status={status} sx={styles.container}>
      <AlertIcon boxSize="40px" mr={0} />

      {title && (
        <AlertTitle mt={6} mr={0} fontSize="2xl">
          {title}
        </AlertTitle>
      )}

      <AlertDescription mt={5} maxWidth="sm" fontSize="md">
        {message}
      </AlertDescription>

      {children && <Box mt={7}>{children}</Box>}
    </Alert>
  </Layout>
);

export default PageAlert;
