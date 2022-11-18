import { Flex } from "@chakra-ui/react";
import styles from "./Layout.styles";

const Layout = ({ children }) => {
  return <Flex css={styles.page}>{children}</Flex>;
};

export default Layout;
