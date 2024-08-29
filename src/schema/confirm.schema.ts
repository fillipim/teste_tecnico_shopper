import Joi from "joi";

export const confirmSchema = Joi.object({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().strict().required(),
});
