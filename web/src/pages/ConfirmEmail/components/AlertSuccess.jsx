import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import PageAlert from '~/components/PageAlert/PageAlert';

const AlertSuccess = () => {
  return (
    <PageAlert
      status="success"
      title="Email address confirmed"
      message="You have successfully confirm your email address. You can now login to the application."
    >
      <Button colorScheme="green" as={RouterLink} to="/login">
        Login
      </Button>
    </PageAlert>
  );
};

export default AlertSuccess;
