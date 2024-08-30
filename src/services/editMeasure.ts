import errorCodes from "../constants/errorCodes";
import { AppDataSource } from "../data-source";
import { Measure } from "../entities/measure.entity";
import AppError from "../errors/appError";
import { editMeasureRequestBody } from "../types/measure";

export async function editMeasure(data: editMeasureRequestBody) {
  const measureRepository = AppDataSource.getRepository(Measure);

  const measure = await measureRepository.findOne({
    where: { id: data.measure_uuid },
  });

  if (!measure) {
    throw new AppError(errorCodes.MEASURE_NOT_FOUND);
  }

  if (measure.hasConfirmed) {
    throw new AppError(errorCodes.CONFIRMATION_DUPLICATE, 409);
  }

  measure.measureValue = data.confirmed_value;
  measure.hasConfirmed = true;

  await measureRepository.save(measure);

  return { success: true };
}
