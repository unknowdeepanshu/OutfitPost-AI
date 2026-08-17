import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { uploadonCloudinary } from "./cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../public/temp");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const downloadAndUploadToCloudinary = async (imageUrl) => {
  let tempFilePath;

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const filename = `${Date.now()}`;
    tempFilePath = path.join(uploadDir, filename);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.promises.writeFile(tempFilePath, buffer);

    const cloudinaryResult = await uploadonCloudinary(tempFilePath);

    return {
      publicId: cloudinaryResult.public_id,
      secureUrl: cloudinaryResult.secure_url,
    };
  } finally {
    if (tempFilePath) {
      try {
        await fs.promises.unlink(tempFilePath);
      } catch (error) {
        console.error("Failed to delete temp file:", error);
      }
    }
  }
};

// console.log(await downloadAndUploadToCloudinary("https://i.pinimg.com/736x/46/9b/75/469b75bda69ef8721bc48804099efc28.jpg"));
