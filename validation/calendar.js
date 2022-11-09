const Joi = require('joi');
const { CALENDAR_NAME_LENGTH, CALENDAR_DESCRIPTION_LENGTH } = require('~/consts/validation');

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(CALENDAR_NAME_LENGTH.min).max(CALENDAR_NAME_LENGTH.max),
  description: Joi.string().min(CALENDAR_DESCRIPTION_LENGTH.min).max(CALENDAR_DESCRIPTION_LENGTH.max),
  color: Joi.string().pattern(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, 'color'),
});

module.exports = { createSchema };
