import Joi = require("joi");

export const uploadSchema = Joi.object({
  image: Joi.string().base64().required(),
  measure_type: Joi.string().valid("WATER", "GAS").required(),
  measure_datetime: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    .required(),
  customer_code: Joi.string(),
});
