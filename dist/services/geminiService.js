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
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});
function extractMeterValue(base64Image) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uploadResponse = yield genAI.uploadFile({
                file: base64Image,
                mimeType: "image/png",
            });
            const result = yield model.generateContent([
                {
                    fileData: {
                        mimeType: uploadResponse.file.mimeType,
                        fileUri: uploadResponse.file.uri,
                    },
                },
                {
                    text: "Extract the numeric meter reading from this image.",
                },
            ]);
            const extractedValue = result.response.text();
            return extractedValue;
        }
        catch (error) {
            console.error("Error extracting meter value:", error);
            throw error;
        }
    });
}
