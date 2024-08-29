import { Router } from "express";
import { readingsContorller } from "../controllers/readingsController";
import { validateUploadDataMiddleware } from "../middlewares/validateUploadMiddleware";
import { validateComfirmDataMiddleware } from "../middlewares/validateConfirmMiddleware";
import { confirmController } from "../controllers/comfirmController";

export const readingRoutes = Router();

readingRoutes.post("/upload", validateUploadDataMiddleware, readingsContorller);
readingRoutes.patch(
  "/comfirm",
  validateComfirmDataMiddleware,
  confirmController
);
