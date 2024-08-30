import { NextFunction, Request, Response } from "express";

import { validate as isValidUUID } from "uuid";
import { confirmSchema } from "../schema/confirm.schema";
import errorCodes from "../constants/errorCodes";

export function validateComfirmDataMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = confirmSchema.validate(req.body);
  const isValidUuid = isValidUUID(req.body.measure_uuid);

  if (error || !isValidUuid) {
    const errorDescription = error
      ? error.details[0].message
      : "Formato inválido para 'measure_uuid'";

    return res.status(400).json({
      error_code: errorCodes.INVALID_DATA.error_code,
      error_description: errorDescription,
    });
  }
  return next();
}
