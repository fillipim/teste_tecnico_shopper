import { Request, Response } from "express";
import { createMeasure } from "../services/createMeasure";

export async function readingsContorller(req: Request, res: Response) {
  const data = await createMeasure(req.body);
  return res.status(200).json(data);
}
