import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import PageAlert from '~/components/PageAlert/PageAlert';

const NotFound = () => (
  <PageAlert
    status="warning"
    title="404 - Page not found!"
    message="We're sorry, the page you requested could not be found. Please go back to the homepage."
  >
    <Button colorScheme="orange" as={RouterLink} to="/">
      Go home
    </Button>
  </PageAlert>
);

export default NotFound;
