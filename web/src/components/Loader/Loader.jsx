import { Spinner } from '@chakra-ui/react';
import Layout from '../Layout/Layout';

const Loader = () => (
  <Layout>
    <Spinner sx={{ width: 100, height: 100 }} speed=".6s" thickness={4} color="yellow.400" />
  </Layout>
);

export default Loader;
