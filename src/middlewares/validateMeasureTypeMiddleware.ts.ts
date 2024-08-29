import { Request, Response, NextFunction } from "express";
import errorCodes from "../constants/errorCodes";

export function validateMeasureType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { measure_type } = req.query;

  if (measure_type) {
    const validTypes = ["WATER", "GAS"];
    const measureTypeUpper = String(measure_type).toUpperCase();

    if (!validTypes.includes(measureTypeUpper)) {
      return res.status(400).json(errorCodes.INVALID_TYPE);
    }
    req.query.measure_type = measureTypeUpper;
  }

  next();
}
