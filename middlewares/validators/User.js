const Joi = require("joi");

const validator = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .meta({ _mongoose: { unique: true } }),

  password: Joi.string().max(100).required(),

  repeat_password: Joi.ref("password"),

  firstname: Joi.string().alphanum().max(100),

  lastname: Joi.string().alphanum().max(100),

  access_tokens: Joi.array().items(Joi.string()),

  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date(Date.now()).getFullYear()),

  date: Joi.date().meta({ _mongoose: { default: Date.now } }),
});

exports.validator = validator;
