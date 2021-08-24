const Joi = require("joi");

const validator = Joi.object({
  firstname: Joi.string().alphanum().max(100).required(),

  lastname: Joi.string().alphanum().max(100),

  address: Joi.string().alphanum().max(1000).required(),

  unit: Joi.string().alphanum().max(100),

  city: Joi.string().alphanum().max(100).required(),

  state: Joi.string().alphanum().max(30).required(),

  zipcode: Joi.string().alphanum().max(30).required(),

  description: Joi.string().alphanum().max(100),
});

exports.validator = validator;
