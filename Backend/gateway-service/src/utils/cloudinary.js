import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary = async (LocalFilePath) => {
  if (!LocalFilePath) return null;

  try {
    const result = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
    });
    return result;
  } finally {
    if (fs.existsSync(LocalFilePath)) {
      fs.unlinkSync(LocalFilePath);
    }
  }
};
export const deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  console.log(result);
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error("Failed to delete old Cloudinary image");
  }

  return result;
};
export { uploadonCloudinary };
