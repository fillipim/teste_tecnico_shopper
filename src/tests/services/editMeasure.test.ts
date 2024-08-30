import { Repository } from "typeorm";
import errorCodes from "../../constants/errorCodes";
import { AppDataSource } from "../../data-source";
import { Measure } from "../../entities/measure.entity";
import AppError from "../../errors/appError";
import { editMeasure } from "../../services/editMeasure";

describe("editMeasure service", () => {
  let mockMeasureRepository: Partial<Repository<Measure>>;
  let spyGetRepository: jest.SpyInstance;

  beforeEach(() => {
    mockMeasureRepository = {
      findOne: jest.fn(),
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

  it("should edit an existing measure successfully", async () => {
    const mockData = {
      measure_uuid: "1234-uuid",
      confirmed_value: 200.75,
    };

    const mockMeasure = new Measure();
    mockMeasure.id = mockData.measure_uuid;
    mockMeasure.hasConfirmed = false;
    mockMeasure.measureValue = 100.5;

    (mockMeasureRepository.findOne as jest.Mock).mockResolvedValue(mockMeasure);

    const result = await editMeasure(mockData);

    expect(mockMeasureRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        measureValue: mockData.confirmed_value,
        hasConfirmed: true,
      })
    );

    expect(result).toEqual({ success: true });
  });

  it("should throw an error if measure is not found", async () => {
    const mockData = {
      measure_uuid: "1234-uuid",
      confirmed_value: 200.75,
    };

    (mockMeasureRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(editMeasure(mockData)).rejects.toThrow(
      new AppError(errorCodes.MEASURE_NOT_FOUND)
    );

    expect(mockMeasureRepository.save).not.toHaveBeenCalled();
  });

  it("should throw an error if measure has already been confirmed", async () => {
    const mockData = {
      measure_uuid: "1234-uuid",
      confirmed_value: 200.75,
    };

    const mockMeasure = new Measure();
    mockMeasure.id = mockData.measure_uuid;
    mockMeasure.hasConfirmed = true;

    (mockMeasureRepository.findOne as jest.Mock).mockResolvedValue(mockMeasure);

    await expect(editMeasure(mockData)).rejects.toThrow(
      new AppError(errorCodes.CONFIRMATION_DUPLICATE, 409)
    );

    expect(mockMeasureRepository.save).not.toHaveBeenCalled();
  });
});
