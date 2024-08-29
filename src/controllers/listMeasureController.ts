import { Request, Response } from "express";
import { listMeasures } from "../services/listMeasures";

export async function listMeasureController(req: Request, res: Response) {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  const measures = await listMeasures(customer_code, measure_type as string);

  return res.status(200).json({
    customer_code: customer_code,
    measures: measures,
  });
}
