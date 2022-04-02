const { celebrate, Joi } = require('celebrate');

const createUserValidator = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  },
});

const loginValidator = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
});

const updateUserValidator = celebrate({
  body: {
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  },
});

module.exports = { createUserValidator, loginValidator, updateUserValidator };
