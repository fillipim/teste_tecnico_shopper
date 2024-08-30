import { Router } from "express";
import { confirmController } from "../controllers/comfirmController";
import { listMeasureController } from "../controllers/listMeasureController";
import { readingsContorller } from "../controllers/readingsController";
import { validateComfirmDataMiddleware } from "../middlewares/validateConfirmMiddleware";
import { validateMeasureType } from "../middlewares/validateMeasureTypeMiddleware.ts";
import { validateUploadDataMiddleware } from "../middlewares/validateUploadMiddleware";

export const readingRoutes = Router();

readingRoutes.post("/upload", validateUploadDataMiddleware, readingsContorller);
readingRoutes.patch(
  "/comfirm",
  validateComfirmDataMiddleware,
  confirmController
);
readingRoutes.get(
  "/:customer_code/list",
  validateMeasureType,
  listMeasureController
);
