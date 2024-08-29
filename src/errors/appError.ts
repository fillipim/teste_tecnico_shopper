import { NextFunction, Request, Response } from "express";
class AppError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(
    errorData: { error_code: string; error_description: string },
    statusCode: number = 400
  ) {
    super(errorData.error_description);
    this.statusCode = statusCode;
    this.errorCode = errorData.error_code;
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

  console.error(error);

  return res
    .status(500)
    .json({
      error_code: "INTERNAL_ERROR",
      error_description: "Internal server error",
    });
};

export default AppError;
