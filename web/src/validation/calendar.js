import * as Yup from 'yup';
import { CALENDAR_NAME_LENGTH, COLOR_PATTERN } from '~/consts/validation';

export const createSchema = Yup.object().shape({
  name: Yup.string().required().min(CALENDAR_NAME_LENGTH.min).max(CALENDAR_NAME_LENGTH.max),
  description: Yup.string().min(CALENDAR_NAME_LENGTH.min).max(CALENDAR_NAME_LENGTH.max),
  color: Yup.string().matches(COLOR_PATTERN),
});
