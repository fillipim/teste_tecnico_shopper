import errorCodes from "../constants/errorCodes";
import { AppDataSource } from "../data-source";
import { Measure } from "../entities/measure.entity";
import AppError from "../errors/appError";
import { UploadRequestBody } from "../types/measure";
import { extractMeterValue } from "./geminiService";

export async function createMeasure(data: UploadRequestBody) {
  const { customer_code, measure_type, measure_datetime, image } = data;
  const month = new Date(measure_datetime).getMonth() + 1;
  const year = new Date(measure_datetime).getFullYear();

  const existingMeasure = await AppDataSource.getRepository(Measure)
    .createQueryBuilder("measure")
    .where("measure.measureType = :measure_type", { measure_type })
    .andWhere("EXTRACT(MONTH FROM measure.measureDatetime) = :month", { month })
    .andWhere("EXTRACT(YEAR FROM measure.measureDatetime) = :year", { year })
    .getOne();

  if (existingMeasure) {
    throw new AppError(errorCodes.DOUBLE_REPORT, 409);
  }

  const measure = await extractMeterValue(image);

  const newMeasure = new Measure();
  newMeasure.customerCode = customer_code;
  newMeasure.measureType = measure_type;
  newMeasure.measureDatetime = new Date(measure_datetime);
  newMeasure.measureValue = Number(measure.extractedValue);
  newMeasure.imageUrl = measure.imageUrl;
  newMeasure.hasConfirmed = false;
  newMeasure.createdAt = new Date();

  const measureRepository = AppDataSource.getRepository(Measure);
  await measureRepository.save(newMeasure);

  return {
    image_url: newMeasure.imageUrl,
    measure_value: newMeasure.measureValue,
    measure_uuid: newMeasure.id,
  };
}
