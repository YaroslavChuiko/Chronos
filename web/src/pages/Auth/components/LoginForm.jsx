import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '~/hooks/use-custom-toast';
import { useLoginMutation } from '~/store/api/authSlice';
import { loginSchema } from '~/validation/auth';
import s from './form.styles';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const initialValues = {
    login: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      await login(values).unwrap();
      navigate('/');
    } catch (error) {
      toast(error.data.message, 'error');
    }
  };

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={8} sx={s.vStack}>
        <FormControl isInvalid={!!errors.login && touched.login}>
          <FormLabel htmlFor="login" sx={s.formLabel}>
            Login
          </FormLabel>
          <Input
            id="login"
            name="login"
            value={values.login}
            onChange={handleChange}
            variant="filled"
            focusBorderColor="teal.400"
            placeholder="Login"
          />
          <FormErrorMessage>{errors.login}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password && touched.password}>
          <FormLabel htmlFor="password" sx={s.formLabel}>
            Password
          </FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            focusBorderColor="teal.400"
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
          sx={s.button}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
