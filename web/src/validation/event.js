import * as Yup from 'yup';
import { COLOR_PATTERN, EVENT_NAME_LENGTH, EVENT_TYPE_ENUM } from '~/consts/validation';

export const createArrangementSchema = Yup.object().shape({
  calendar: Yup.string().required('Calendar is required!'),
  name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  content: Yup.string(),
  color: Yup.string().matches(COLOR_PATTERN),
  start: Yup.date().required(),
  end: Yup.date().min(Yup.ref('start')).required(),
  type: Yup.string().required().oneOf(Object.values(EVENT_TYPE_ENUM)),
});

export const updateArrangementSchema = Yup.object().shape({
  name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  content: Yup.string(),
  color: Yup.string().matches(COLOR_PATTERN),
  start: Yup.date().required(),
  end: Yup.date().min(Yup.ref('start')).required(),
});

export const createTaskSchema = Yup.object().shape({
  calendar: Yup.string().required('Calendar is required!'),
  name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  content: Yup.string(),
  color: Yup.string().matches(COLOR_PATTERN),
  date: Yup.date().required(),
  type: Yup.string().required().oneOf(Object.values(EVENT_TYPE_ENUM)),
});

export const updateTaskSchema = Yup.object().shape({
  name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  content: Yup.string(),
  color: Yup.string().matches(COLOR_PATTERN),
  date: Yup.date().required(),
});

export const createReminderSchema = Yup.object().shape({
  calendar: Yup.string().required('Calendar is required!'),
  name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  content: Yup.string(),
  color: Yup.string().matches(COLOR_PATTERN),
  start: Yup.date().required(),
  type: Yup.string().required().oneOf(Object.values(EVENT_TYPE_ENUM)),
});

export const updateReminderSchema = Yup.object().shape({
  name: Yup.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  content: Yup.string(),
  color: Yup.string().matches(COLOR_PATTERN),
  start: Yup.date().required(),
});
