import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useLoginMutation } from '~/store/api/apiSlice';
import { loginSchema } from '~/validation/auth';

const Login = () => {
  const toast = useToast();
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setErrors, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        login: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          await login(values).unwrap();
        } catch (error) {
          if (error.status === 400 || error.status === 404) {
            const message = 'Login or password is not correct';
            setErrors({ login: message, password: message });
          }

          if (error.status === 403) {
            toast({
              // title: 'Login error',
              title: error.data.message,
              // description: error.data.message,
              duration: 9000,
              isClosable: true,
              status: 'error',
            });
          }
        }
      },
    });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh" p="10px">
      <Box bg="white" p="40px 40px 30px" rounded="10px" maxW={380} w="full">
        <Heading as="h1" size="md" mb="35px" textAlign="center">
          Log in to your account
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={8} alignItems="flex-start">
            <FormControl isInvalid={!!errors.login && touched.login}>
              <FormLabel htmlFor="login" fontSize="sm" ml="5px">
                Login
              </FormLabel>
              <Input
                id="login"
                name="login"
                type="login"
                value={values.login}
                onChange={handleChange}
                // onBlur={handleBlur}
                variant="filled"
                placeholder="Login"
              />
              <FormErrorMessage>{errors.login}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password" fontSize="sm" ml="5px">
                Password
              </FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                // onBlur={handleBlur}
                variant="filled"
                placeholder="Password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Submitting"
              spinnerPlacement="end"
              colorScheme="yellow"
              w="full"
            >
              Login
            </Button>
          </VStack>
        </form>
        <Flex mt="20px" align="center" justify="center">
          <Text color="gray.500" fontSize="sm">
            Don't have an account yeat?
            <Link as={ReactRouterLink} to={'/'} color="teal.500" ml="5px">
              Sign up
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
