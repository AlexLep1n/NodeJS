const joi = require("joi");

const userScheme = joi.object({
  firstName: joi.string().min(2).required(),
  surname: joi.string().min(2).required(),
  age: joi.number().min(0).required(),
  city: joi.string().min(2),
});

const idScheme = joi.object({
  id: joi.number().required(),
});

module.exports = { userScheme, idScheme };
