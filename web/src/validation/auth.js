import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  login: Yup.string().required(),
  password: Yup.string().required(),
});
