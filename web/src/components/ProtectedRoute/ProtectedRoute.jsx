import { Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import PageAlert from '../PageAlert/PageAlert';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (user.id) {
    return <Outlet />;
  }

  return (
    <PageAlert
      status="warning"
      title="403 - Access denied!"
      message="You don't have permission to access this page."
    >
      <Button colorScheme="orange" as={RouterLink} to="/login">
        Login
      </Button>
    </PageAlert>
  );
};

export default ProtectedRoute;
