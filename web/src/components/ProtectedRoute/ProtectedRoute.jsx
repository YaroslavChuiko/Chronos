import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as RouterLink, Outlet } from "react-router-dom";
import PageAlert from "../PageAlert/PageAlert";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (user.id) {
    return <Outlet />;
  }

  return (
    <PageAlert status="error" message="You cannot access this page.">
      <Button color="white" bgColor="red.500" as={RouterLink} to="/login">
        Login
      </Button>
    </PageAlert>
  );
};

export default ProtectedRoute;
