"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super();
        (this.statusCode = statusCode), (this.message = message);
    }
}
const handleError = (error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
};
exports.handleError = handleError;
exports.default = AppError;
