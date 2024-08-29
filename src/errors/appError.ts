import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, statusCode: number = 400, errorCode: string) {
    super();
    (this.statusCode = statusCode),
      (this.message = message),
      (this.errorCode = errorCode);
  }
}

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ error_code: error.errorCode, error_description: error.message });
  }

  console.log(error);

  return res.status(500).json({ error_description: "Internal server error" });
};

export default AppError;
