const Joi = require('joi');
const { EVENT_TYPE_ENUM } = require('~/consts/validation');

const eventSchema = Joi.object().keys({
  type: Joi.string().valid(...Object.values(EVENT_TYPE_ENUM)),
  startAt: Joi.date().iso(),
  endAt: Joi.date().iso(),
});

module.exports = { eventSchema };
