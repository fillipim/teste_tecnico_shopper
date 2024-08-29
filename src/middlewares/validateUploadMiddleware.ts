import { Request, Response, NextFunction, RequestHandler } from "express";
import { uploadSchema } from "../schema/upload.schema";
import errorCodes from "../constants/errorCodes";

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
