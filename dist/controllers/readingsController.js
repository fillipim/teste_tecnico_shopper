"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readingsContorller = void 0;
const createMeasure_1 = require("../services/createMeasure");
const readingsContorller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, createMeasure_1.createMeasure)(req.body);
    return res.status(200).json("Oláa");
});
exports.readingsContorller = readingsContorller;
