import Joi from "joi";

export const confirmSchema = Joi.object({
  measure_uuid: Joi.string(),
  confirmed_value: Joi.number(),
});
