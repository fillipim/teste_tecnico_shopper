import { Router } from "express";
import { readingsContorller } from "../controllers/readingsController";
import { validateUploadDataMiddleware } from "../middlewares/validateUploadMiddleware";
import { validateComfirmDataMiddleware } from "../middlewares/validateConfirmMiddleware";
import { confirmController } from "../controllers/comfirmController";
import { validateMeasureType } from "./../middlewares/validateMeasureTypeMiddleware.ts";
import { listMeasureController } from "../controllers/listMeasureController";

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
