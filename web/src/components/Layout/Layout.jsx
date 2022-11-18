import { Flex } from '@chakra-ui/react';
import styles from './Layout.styles';

const Layout = ({ children }) => {
  return <Flex sx={styles.page}>{children}</Flex>;
};

export default Layout;
