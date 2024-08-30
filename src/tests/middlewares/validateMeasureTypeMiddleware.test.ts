import { Request, Response, NextFunction } from "express";
import errorCodes from "../../constants/errorCodes";
import { validateMeasureType } from "../../middlewares/validateMeasureTypeMiddleware.ts";

describe("validateMeasureType Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = { query: {} };
    mockResponse = {
      status: jest.fn(() => mockResponse) as any,
      json: jest.fn(),
    };
    mockNext = jest.fn();
    statusSpy = jest.spyOn(mockResponse, "status");
    jsonSpy = jest.spyOn(mockResponse, "json");
  });

  it("should call next if no measure_type is provided", () => {
    validateMeasureType(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalled();
  });

  it("should return 400 if an invalid measure_type is provided", () => {
    mockRequest.query!.measure_type = "invalid";

    validateMeasureType(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(jsonSpy).toHaveBeenCalledWith(errorCodes.INVALID_TYPE);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should set measure_type to uppercase if valid measure_type is provided", () => {
    mockRequest.query!.measure_type = "water";

    validateMeasureType(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockRequest.query!.measure_type).toBe("WATER");
    expect(mockNext).toHaveBeenCalled();
  });
});
