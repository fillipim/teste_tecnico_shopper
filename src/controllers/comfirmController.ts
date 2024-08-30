import { Request, Response } from "express";
import { editMeasure } from "../services/editMeasure";

export async function confirmController(req: Request, res: Response) {
  const data = await editMeasure(req.body);
  return res.status(200).json(data);
}
