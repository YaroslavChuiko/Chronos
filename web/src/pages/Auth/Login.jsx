import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import s from './auth.styles';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <Flex sx={s.wrapper}>
      <Box sx={s.container}>
        <Heading as="h1" sx={s.heading}>
          Log in to your account
        </Heading>
        <LoginForm />
        <Flex sx={s.footer}>
          <Text sx={s.footerText}>
            Don't have an account yeat?
            <Link as={ReactRouterLink} to={'/register'} sx={s.footerLink}>
              Sign up
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
