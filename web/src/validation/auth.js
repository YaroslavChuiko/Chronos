import * as Yup from 'yup';
import { LOGIN_LENGTH, PASSWORD_LENGTH } from '~/consts/validation';

export const loginSchema = Yup.object().shape({
  login: Yup.string().required(),
  password: Yup.string().required(),
});

export const registerSchema = Yup.object().shape({
  login: Yup.string().required().min(LOGIN_LENGTH.min).max(LOGIN_LENGTH.max),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match'),
});
