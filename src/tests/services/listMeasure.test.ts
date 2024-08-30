import { Repository, SelectQueryBuilder } from "typeorm";
import errorCodes from "../../constants/errorCodes";
import { AppDataSource } from "../../data-source";
import { Measure } from "../../entities/measure.entity";
import AppError from "../../errors/appError";
import { listMeasures } from "../../services/listMeasures";

describe("listMeasures service", () => {
  let mockMeasureRepository: Partial<Repository<Measure>>;
  let mockQueryBuilder: Partial<SelectQueryBuilder<Measure>>;
  let spyGetRepository: jest.SpyInstance;

  beforeEach(() => {
    mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    };

    mockMeasureRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    spyGetRepository = jest
      .spyOn(AppDataSource, "getRepository")
      .mockReturnValue(mockMeasureRepository as Repository<Measure>);

    jest.clearAllMocks();
  });

  afterEach(() => {
    spyGetRepository.mockRestore();
  });

  it("should list measures for a customer successfully", async () => {
    const mockCustomerCode = "customer123";

    const mockMeasures = [
      {
        id: "uuid1",
        measureDatetime: "2024-08-30T12:00:00Z",
        measureType: "WATER",
        hasConfirmed: false,
        imageUrl: "https://example.com/image1.png",
      },
      {
        id: "uuid2",
        measureDatetime: "2024-08-29T15:30:00Z",
        measureType: "GAS",
        hasConfirmed: true,
        imageUrl: "https://example.com/image2.png",
      },
    ];

    (mockQueryBuilder.getMany as jest.Mock).mockResolvedValue(mockMeasures);

    const result = await listMeasures(mockCustomerCode);

    expect(result).toEqual([
      {
        measure_uuid: "uuid1",
        measure_datetime: "2024-08-30T12:00:00Z",
        measure_type: "WATER",
        has_confirmed: false,
        image_url: "https://example.com/image1.png",
      },
      {
        measure_uuid: "uuid2",
        measure_datetime: "2024-08-29T15:30:00Z",
        measure_type: "GAS",
        has_confirmed: true,
        image_url: "https://example.com/image2.png",
      },
    ]);

    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      "measure.customerCode = :customerCode",
      { customerCode: mockCustomerCode }
    );
    expect(mockQueryBuilder.getMany).toHaveBeenCalledTimes(1);
  });

  it("should filter by measure type if provided", async () => {
    const mockCustomerCode = "customer123";
    const mockMeasureType = "WATER";

    const mockMeasures = [
      {
        id: "uuid1",
        measureDatetime: "2024-08-30T12:00:00Z",
        measureType: "WATER",
        hasConfirmed: false,
        imageUrl: "https://example.com/image1.png",
      },
    ];

    (mockQueryBuilder.getMany as jest.Mock).mockResolvedValue(mockMeasures);

    const result = await listMeasures(mockCustomerCode, mockMeasureType);

    expect(result).toEqual([
      {
        measure_uuid: "uuid1",
        measure_datetime: "2024-08-30T12:00:00Z",
        measure_type: "WATER",
        has_confirmed: false,
        image_url: "https://example.com/image1.png",
      },
    ]);

    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      "measure.customerCode = :customerCode",
      { customerCode: mockCustomerCode }
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      "measure.measureType = :measureType",
      { measureType: mockMeasureType }
    );
    expect(mockQueryBuilder.getMany).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if no measures are found", async () => {
    const mockCustomerCode = "customer123";

    (mockQueryBuilder.getMany as jest.Mock).mockResolvedValue([]);

    await expect(listMeasures(mockCustomerCode)).rejects.toThrow(
      new AppError(errorCodes.MEASURES_NOT_FOUND, 404)
    );

    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      "measure.customerCode = :customerCode",
      { customerCode: mockCustomerCode }
    );
    expect(mockQueryBuilder.getMany).toHaveBeenCalledTimes(1);
  });
});
