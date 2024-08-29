import errorCodes from "../constants/errorCodes";
import { AppDataSource } from "../data-source";
import { Measure } from "../entities/measure.entity";
import AppError from "../errors/appError";

export async function listMeasures(customerCode: string, measureType?: string) {
  const measureRepository = AppDataSource.getRepository(Measure);

  let query = measureRepository
    .createQueryBuilder("measure")
    .where("measure.customerCode = :customerCode", { customerCode });

  if (measureType) {
    query = query.andWhere("measure.measureType = :measureType", {
      measureType,
    });
  }

  const measures = await query.getMany();

  if (measures.length === 0) {
    throw new AppError(errorCodes.MEASURES_NOT_FOUND, 404);
  }

  return measures.map((measure) => ({
    measure_uuid: measure.id,
    measure_datetime: measure.measureDatetime,
    measure_type: measure.measureType,
    has_confirmed: measure.hasConfirmed,
    image_url: measure.imageUrl,
  }));
}
