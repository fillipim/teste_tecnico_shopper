import Joi from "joi";

export const confirmSchema = Joi.object({
  measure_uuid: Joi.string().required().messages({
    "string.empty": 'O campo "measure_uuid" não pode estar vazio.',
    "any.required": 'O campo "measure_uuid" é obrigatório.',
  }),
  confirmed_value: Joi.number().strict().required().messages({
    "number.base": "O valor confirmado deve ser um número.",
    "any.required": 'O campo "confirmed_value" é obrigatório.',
    "number.empty": 'O campo "confirmed_value" não pode estar vazio.',
  }),
});
