import Joi from "joi";

export const uploadSchema = Joi.object({
  image: Joi.string().base64().required().messages({
    "string.base64": "A imagem deve estar em formato base64.",
    "any.required": 'O campo "image" é obrigatório.',
    "string.empty": 'O campo "image" não pode estar vazio.',
  }),
  measure_type: Joi.string().valid("WATER", "GAS").required().messages({
    "any.only": 'O tipo de medição deve ser "WATER" ou "GAS".',
    "any.required": 'O campo "measure_type" é obrigatório.',
    "string.empty": 'O campo "measure_type" não pode estar vazio.',
  }),
  measure_datetime: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    .required()
    .messages({
      "string.pattern.base":
        "A data e hora devem estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ).",
      "any.required": 'O campo "measure_datetime" é obrigatório.',
      "string.empty": 'O campo "measure_datetime" não pode estar vazio.',
    }),
  customer_code: Joi.string().messages({
    "string.empty": 'O campo "customer_code" não pode estar vazio.',
  }),
});
