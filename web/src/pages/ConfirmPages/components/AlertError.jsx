import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import PageAlert from '~/components/PageAlert/PageAlert';

const AlertError = ({ message }) => {
  return (
    <PageAlert status="error" title="Confirmation error!" message={message}>
      <Button colorScheme="red" as={RouterLink} to="/">
        Go home
      </Button>
    </PageAlert>
  );
};

export default AlertError;
