const Joi = require("joi");

const validator = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  subtitle: Joi.string().max(100),

  type: Joi.string().alphanum().max(30),

  chipset: Joi.string().alphanum().max(30),

  maker: Joi.string().alphanum().max(30),

  brand: Joi.string().alphanum().max(30),

  quantity: Joi.number()
    .integer()
    .min(0)
    .meta({ _mongoose: { default: 0 } }),

  price: Joi.number().min(0),

  imgUrl: Joi.string(),

  rating: Joi.number()
    .min(0)
    .max(5)
    .meta({ _mongoose: { default: 0 } }),

  tags: Joi.array().items(Joi.string()),

  date: Joi.date().meta({ _mongoose: { default: Date.now } }),
});

exports.validator = validator;
