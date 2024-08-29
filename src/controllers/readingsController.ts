import { Request, Response } from "express";
import { createMeasure } from "../services/createMeasure";

export const readingsContorller = async (req: Request, res: Response) => {
  const data = await createMeasure(req.body);
  return res.status(200).json(data);
};
