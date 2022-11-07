const Joi = require('joi');
const { NAME_LENGTH, PASSWORD_LENGTH } = require('~/consts/validation');

const loginSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object().keys({
  login: Joi.string().required().min(NAME_LENGTH.min).max(NAME_LENGTH.max),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
});

const updateSchema = Joi.object().keys({
  login: Joi.string().min(NAME_LENGTH.min).max(NAME_LENGTH.max),
  email: Joi.string().email(),
});

module.exports = { loginSchema, registerSchema, updateSchema };
