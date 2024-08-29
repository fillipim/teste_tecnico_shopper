import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const fileManager = new GoogleAIFileManager(
  process.env.GEMINI_API_KEY as string
);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function extractMeterValue(base64Image: string) {
  try {
    const imageBuffer = Buffer.from(base64Image, "base64");
    const tempFilePath = path.join(__dirname, "temp_image.png");

    fs.writeFileSync(tempFilePath, imageBuffer);

    const uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType: "image/png",
      displayName: "Meter reading image",
    });

    fs.unlinkSync(tempFilePath);

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: "Extract the numerical meter reading from this image.",
      },
    ]);

    const extractedValue = result.response.text().match(/\d+/g) || [];

    return {
      extractedValue: parseFloat(extractedValue.join("")),
      imageUrl: uploadResponse.file.uri,
    };
  } catch (error) {
    console.error("Error extracting meter value:", error);
    throw error;
  }
}
