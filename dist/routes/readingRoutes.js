"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readingRoutes = void 0;
const express_1 = require("express");
const readingsController_1 = require("../controllers/readingsController");
const validationsMiddleware_1 = require("../middlewares/validationsMiddleware");
exports.readingRoutes = (0, express_1.Router)();
exports.readingRoutes.post("/upload", validationsMiddleware_1.validateDataMiddleware, readingsController_1.readingsContorller);
