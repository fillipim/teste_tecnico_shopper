import request from "supertest";
import express from "express";
import { base64 } from "../mock/base64";
import errorCodes from "../../constants/errorCodes";
import { validateUploadDataMiddleware } from "../../middlewares/validateUploadMiddleware";

const app = express();
app.use(express.json());
app.post("/upload", validateUploadDataMiddleware, (req, res) => {
  res.status(200).json({
    image_url: "imageUrl",
    measure_value: 1234,
    measure_uuid: "bc7315d6-6407-48dc-9fb9-4fd684feb67e",
  });
});

describe("validateUploadDataMiddleware", () => {
  it("should return 400 if image is missing or not base64", async () => {
    const invalidData = {
      image: "notBase64",
      measure_type: "WATER",
      measure_datetime: "2024-08-29T12:00:00Z",
    };

    const response = await request(app).post("/upload").send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(errorCodes.INVALID_DATA);
  });

  it("should return 400 if measure_type is invalid", async () => {
    const invalidData = {
      image: "validBase64StringHere",
      measure_type: "INVALID_TYPE",
      measure_datetime: "2024-08-29T12:00:00Z",
    };

    const response = await request(app).post("/upload").send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(errorCodes.INVALID_DATA);
  });

  it("should return 400 if measure_datetime is not in the correct format", async () => {
    const invalidData = {
      image: "validBase64StringHere",
      measure_type: "WATER",
      measure_datetime: "2024-08-29 12:00:00",
    };

    const response = await request(app).post("/upload").send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(errorCodes.INVALID_DATA);
  });

  it("should return 200 if data is valid", async () => {
    const validData = {
      image: base64,
      measure_type: "WATER",
      measure_datetime: "2024-08-29T12:00:00Z",
      customer_code: "12345",
    };

    const response = await request(app).post("/upload").send(validData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      image_url: "imageUrl",
      measure_value: 1234,
      measure_uuid: "bc7315d6-6407-48dc-9fb9-4fd684feb67e",
    });
  });
});
