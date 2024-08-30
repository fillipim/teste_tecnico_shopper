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
    return res.status(400).json(errorCodes.INVALID_DATA);
  }
  return next();
}
