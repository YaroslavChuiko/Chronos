import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import s from './auth.styles';
import RegisterForm from './components/RegisterForm';

const Register = () => {
  return (
    <Flex sx={s.wrapper}>
      <Box sx={s.container}>
        <Heading as="h1" sx={s.heading}>
          Create an account
        </Heading>
        <RegisterForm />
        <Flex sx={s.footer}>
          <Text sx={s.footerText}>
            Already have an account?
            <Link as={ReactRouterLink} to={'/login'} sx={s.footerLink}>
              Log in
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;
