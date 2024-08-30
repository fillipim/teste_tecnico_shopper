import { Router } from "express";
import { confirmController } from "../controllers/comfirmController";
import { listMeasureController } from "../controllers/listMeasureController";
import { readingsContorller } from "../controllers/readingsController";
import { validateComfirmDataMiddleware } from "../middlewares/validateConfirmMiddleware";
import { validateMeasureType } from "../middlewares/validateMeasureTypeMiddleware.ts";
import { validateUploadDataMiddleware } from "../middlewares/validateUploadMiddleware";
import NodeCache from "node-cache";
import path from "path";

export const readingRoutes = Router();

const cache = new NodeCache({ stdTTL: 3600 });

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
