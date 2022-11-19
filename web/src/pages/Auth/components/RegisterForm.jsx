import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useCustomToast from '~/hooks/use-custom-toast';
import { useRegisterMutation } from '~/store/api/authSlice';
import { registerSchema } from '~/validation/auth';
import s from './form.styles';

const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const initialValues = {
    login: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const onSubmit = async (values) => {
    try {
      await register(values).unwrap();
      toast('You are successfully registered', 'success');
      navigate('/login');
    } catch (error) {
      toast(error.data.message, 'error');
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={8} sx={s.vStack}>
        <FormControl isInvalid={!!errors.login && touched.login} isRequired>
          <FormLabel htmlFor="login" sx={s.formLabel}>
            Login
          </FormLabel>
          <Input
            id="login"
            name="login"
            value={values.login}
            focusBorderColor="teal.400"
            onChange={handleChange}
            onBlur={handleBlur}
            variant="filled"
            placeholder="Login"
          />
          <FormErrorMessage>{errors.login}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email && touched.email} isRequired>
          <FormLabel htmlFor="email" sx={s.formLabel}>
            Email
          </FormLabel>
          <Input
            id="email"
            name="email"
            value={values.email}
            focusBorderColor="teal.400"
            onChange={handleChange}
            onBlur={handleBlur}
            variant="filled"
            placeholder="Email"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password && touched.password} isRequired>
          <FormLabel htmlFor="password" sx={s.formLabel}>
            Password
          </FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            focusBorderColor="teal.400"
            variant="filled"
            placeholder="Password"
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.passwordConfirm && touched.passwordConfirm} isRequired>
          <FormLabel htmlFor="passwordConfirm" sx={s.formLabel}>
            Repeat password
          </FormLabel>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            focusBorderColor="teal.400"
            variant="filled"
            placeholder="Repeat password"
          />
          <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting"
          spinnerPlacement="end"
          colorScheme="yellow"
          sx={s.button}
        >
          Sign up
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterForm;
