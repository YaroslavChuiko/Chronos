const Joi = require('joi');
const {
  CALENDAR_NAME_LENGTH,
  COLOR_PATTERN,
  EVENT_TYPE_ENUM,
  CALENDAR_DESCRIPTION_LENGTH,
} = require('~/consts/validation');

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(CALENDAR_NAME_LENGTH.min).max(CALENDAR_NAME_LENGTH.max), //! change min, max
  content: Joi.string().required().min(CALENDAR_DESCRIPTION_LENGTH.min).max(CALENDAR_DESCRIPTION_LENGTH.max), //! change min, max
  color: Joi.string().required().pattern(COLOR_PATTERN, 'color'),
  type: Joi.string()
    .required()
    .valid(...Object.values(EVENT_TYPE_ENUM)),
  startAt: Joi.date().required().iso().less(Joi.ref('endAt')).min('now'), //? type iso or timestamp('javascript')
  endAt: Joi.date().required().iso(),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().required().min(CALENDAR_NAME_LENGTH.min).max(CALENDAR_NAME_LENGTH.max), //! change min, max
  content: Joi.string().required().min(CALENDAR_DESCRIPTION_LENGTH.min).max(CALENDAR_DESCRIPTION_LENGTH.max), //! change min, max
  color: Joi.string().required().pattern(COLOR_PATTERN, 'color'),
  startAt: Joi.date().required().iso().less(Joi.ref('endAt')).min('now'), //? type iso or timestamp('javascript')
  endAt: Joi.date().required().iso(),
});

module.exports = { createSchema, updateSchema };
