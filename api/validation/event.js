const Joi = require('joi');
const {
  COLOR_PATTERN,
  EVENT_TYPE_ENUM,
  CALENDAR_DESCRIPTION_LENGTH,
  EVENT_NAME_LENGTH,
} = require('~/consts/validation');

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  content: Joi.string().allow(''),
  color: Joi.string().pattern(COLOR_PATTERN, 'color'),
  type: Joi.string()
    .required()
    .valid(...Object.values(EVENT_TYPE_ENUM)),
  start: Joi.date().required().iso().less(Joi.ref('end')),
  end: Joi.date().required().iso(),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max), //! change min, max
  content: Joi.string().required().min(CALENDAR_DESCRIPTION_LENGTH.min).max(CALENDAR_DESCRIPTION_LENGTH.max), //! change min, max
  color: Joi.string().pattern(COLOR_PATTERN, 'color'),
  start: Joi.date().required().iso().less(Joi.ref('end')).min('now'), //? type iso or timestamp('javascript')
  end: Joi.date().required().iso(),
});

module.exports = { createSchema, updateSchema };
