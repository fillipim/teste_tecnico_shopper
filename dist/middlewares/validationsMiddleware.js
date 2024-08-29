"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDataMiddleware = void 0;
const upload_schema_1 = require("../schema/upload.schema");
const validateDataMiddleware = (req, res, next) => {
    const { error } = upload_schema_1.uploadSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        });
    }
    return next();
};
exports.validateDataMiddleware = validateDataMiddleware;
