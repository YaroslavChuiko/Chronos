import { Spinner } from '@chakra-ui/react';
import Layout from '../Layout/Layout';

const Loader = ({ isFullScreen = true }) => {
  if (!isFullScreen) {
    return <Spinner size="lg" speed=".6s" color="yellow.400" />;
  }

  return (
    <Layout>
      <Spinner
        sx={{
          width: 100,
          height: 100,
        }}
        speed=".6s"
        color="yellow.400"
        thickness={4}
      />
    </Layout>
  );
};

export default Loader;
