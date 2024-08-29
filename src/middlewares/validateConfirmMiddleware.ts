import { RequestHandler, NextFunction, Request, Response } from "express";
import { confirmSchema } from "../schema/confirm.schema";

export function validateComfirmDataMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = confirmSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }
  return next();
}
