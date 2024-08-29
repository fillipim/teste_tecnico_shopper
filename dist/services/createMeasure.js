"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeasure = createMeasure;
const data_source_1 = require("../data-source");
const measure_entity_1 = require("../entities/measure.entity");
const appError_1 = require("../errors/appError");
function createMeasure(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { customer_code, measure_type, measure_datetime, image } = data;
        const useRepository = data_source_1.AppDataSource.getRepository;
        const month = measure_datetime.getMonth() + 1;
        const year = measure_datetime.getFullYear();
        const existingMeasure = yield data_source_1.AppDataSource.getRepository(measure_entity_1.Measure)
            .createQueryBuilder("measure")
            .where("measure.customerCode = :customer_code", { customer_code })
            .andWhere("measure.measureType = :measure_type", { measure_type })
            .andWhere("EXTRACT(MONTH FROM measure.measureDatetime) = :month", { month })
            .andWhere("EXTRACT(YEAR FROM measure.measureDatetime) = :year", { year })
            .getOne();
        if (existingMeasure) {
            throw new appError_1.default("Já existe uma leitura para este tipo no mês atual", 409);
        }
        const measureValue = extractMeterValue(image);
        console.log(measureValue);
    });
}
