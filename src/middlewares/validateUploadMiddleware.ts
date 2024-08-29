import { Request, Response, NextFunction, RequestHandler } from "express";
import { uploadSchema } from "../schema/upload.schema";

export const validateUploadDataMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = uploadSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }
  return next();
};
