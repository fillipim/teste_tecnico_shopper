import { Repository, SelectQueryBuilder } from "typeorm";
import { base64 } from "../mock/base64";
import errorCodes from "../../constants/errorCodes";
import { AppDataSource } from "../../data-source";
import { Measure } from "../../entities/measure.entity";
import AppError from "../../errors/appError";
import { createMeasure } from "../../services/createMeasure";
import { extractMeterValue } from "../../services/geminiService";
import { UploadRequestBody } from "../../types/measure";

jest.mock("@/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock("@/services/geminiService", () => ({
  extractMeterValue: jest.fn(),
}));

const mockData: UploadRequestBody = {
  customer_code: "123",
  measure_type: "WATER",
  measure_datetime: new Date("2024-08-29T12:00:00Z"),
  image: base64,
};

describe("createMeasure service", () => {
  let mockMeasureRepository: Partial<Repository<Measure>>;
  let mockQueryBuilder: Partial<SelectQueryBuilder<Measure>>;
  let spyGetRepository: jest.SpyInstance;

  const mockExtractMeterValue = extractMeterValue as jest.Mock;

  beforeEach(() => {
    mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    };

    mockMeasureRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
      save: jest.fn(),
    };

    spyGetRepository = jest
      .spyOn(AppDataSource, "getRepository")
      .mockReturnValue(mockMeasureRepository as Repository<Measure>);

    jest.clearAllMocks();
  });

  afterEach(() => {
    spyGetRepository.mockRestore();
  });

  it("should create a new measure successfully", async () => {
    const mockExtractedMeasure = {
      extractedValue: "150.75",
      imageUrl: "https://imageurl.com",
    };

    (mockQueryBuilder.getOne as jest.Mock).mockResolvedValue(null);
    mockExtractMeterValue.mockResolvedValue(mockExtractedMeasure);

    const result = await createMeasure(mockData);

    expect(mockMeasureRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      image_url: mockExtractedMeasure.imageUrl,
      measure_value: 150.75,
      measure_uuid: undefined,
    });
  });

  it("should throw an error if a measure already exists for the same month and year", async () => {
    const existingMeasure = new Measure();

    (mockQueryBuilder.getOne as jest.Mock).mockResolvedValue(existingMeasure);

    await expect(createMeasure(mockData)).rejects.toThrow(
      new AppError(errorCodes.DOUBLE_REPORT, 409)
    );

    expect(mockMeasureRepository.save).not.toHaveBeenCalled();
  });

  it("should throw an error if extractMeterValue fails", async () => {
    (mockQueryBuilder.getOne as jest.Mock).mockResolvedValue(null);

    mockExtractMeterValue.mockRejectedValue(new Error("Extraction Failed"));

    await expect(createMeasure(mockData)).rejects.toThrow("Extraction Failed");

    expect(mockMeasureRepository.save).not.toHaveBeenCalled();
  });
});
