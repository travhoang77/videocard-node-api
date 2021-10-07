const Joi = require("joi");

const validator = Joi.object({
  name: Joi.string().min(3).max(5000).required(),

  subtitle: Joi.string().max(5000),

  type: Joi.string().alphanum().max(100),

  chipset: Joi.string().max(100),

  maker: Joi.string().alphanum().max(100),

  brand: Joi.string().alphanum().max(100),

  features: Joi.array().items(Joi.string()),

  quantity: Joi.number()
    .integer()
    .min(0)
    .meta({ _mongoose: { default: 0 } }),

  price: Joi.number().min(0),

  images: Joi.array().items(
    Joi.object().keys({
      url: Joi.string().required(),
      type: Joi.string().alphanum().max(30).required(),
      description: Joi.string().allow(null, ""),
    })
  ),

  rating: Joi.number()
    .min(0)
    .max(5)
    .meta({ _mongoose: { default: 0 } }),

  tags: Joi.array().items(Joi.string()),

  date: Joi.date().meta({ _mongoose: { default: Date.now } }),
});

exports.validator = validator;
