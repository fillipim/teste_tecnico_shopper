import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import errorCodes from "../../constants/errorCodes";
import { validateComfirmDataMiddleware } from "../../middlewares/validateConfirmMiddleware";

const app = express();
app.use(express.json());

app.patch(
  "/confirm",
  validateComfirmDataMiddleware,
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Data confirmed successfully" });
  }
);

describe("validateComfirmDataMiddleware", () => {
  it("should return 400 if invalid UUID is provided", async () => {
    const requestBody = {
      measure_uuid: "invalid-uuid",
      confirmed_value: 123.45,
    };

    const response = await request(app)
      .patch("/confirm")
      .send(requestBody)
      .expect(400);

    expect(response.body).toEqual({
      error_code: errorCodes.INVALID_DATA.error_code,
      error_description: "Formato inválido para 'measure_uuid'",
    });
  });

  it("should return 400 if invalid confirmed_value is provided", async () => {
    const requestBody = {
      measure_uuid: "7c8fb5d1-8451-4d12-9b4b-2c2e62ff403d",
      confirmed_value: "invalid-number",
    };

    const response = await request(app)
      .patch("/confirm")
      .send(requestBody)
      .expect(400);

    expect(response.body).toEqual({
      error_code: errorCodes.INVALID_DATA.error_code,
      error_description: '"confirmed_value" must be a number',
    });
  });

  it("should proceed to the next middleware if data is valid", async () => {
    const requestBody = {
      measure_uuid: "7c8fb5d1-8451-4d12-9b4b-2c2e62ff403d",
      confirmed_value: 123.45,
    };

    const response = await request(app)
      .patch("/confirm")
      .send(requestBody)
      .expect(200);

    expect(response.body).toEqual({
      message: "Data confirmed successfully",
    });
  });
});
