import { Router } from "express";
import { readingsContorller } from "../controllers/readingsController";
import { validateDataMiddleware } from "../middlewares/validationsMiddleware";

export const readingRoutes = Router();

readingRoutes.post("/upload", validateDataMiddleware, readingsContorller);
