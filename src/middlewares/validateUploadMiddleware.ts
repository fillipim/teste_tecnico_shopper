import { Request, Response, NextFunction } from "express";
import errorCodes from "../constants/errorCodes";
import { uploadSchema } from "../schema/upload.schema";

export async function validateUploadDataMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = uploadSchema.validate(req.body);
  if (error) {
    const errorDescription = error.details[0].message;

    return res.status(400).json({
      error_code: errorCodes.INVALID_DATA.error_code,
      error_description: errorDescription,
    });
  }
  return next();
}
