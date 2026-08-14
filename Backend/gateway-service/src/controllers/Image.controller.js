import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

const UploadFashionImage = asyncHandler(async (req, res) => {
  const auth = getAuth(req);

  if (!auth.isAuthenticated || !auth.userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const chatId = req.body.chatId;

  const file = req.file;
  const FashionImages = [];
  if (!file) {
    throw new ApiError(400, "Please upload at least one image");
  }
  const cloudinaryResponse = await uploadonCloudinary(file.path);

  if (!cloudinaryResponse?.secure_url) {
    throw new ApiError(500, "Image upload failed");
  }

  FashionImages.push({
    fieldName: file.fieldName,
    url: cloudinaryResponse.secure_url,
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { images: FashionImages },
        "FashionImages uploaded successfully",
      ),
    );
});

const UploadModelImage = asyncHandler(async (req, res) => {
  const auth = getAuth(req);

  if (!auth.isAuthenticated || !auth.userId) {
    console.log("user auth error", auth);
    throw new ApiError(401, "Unauthorized");
  }
  const chatId = req.body.chatId;
  const file = req.file;
  console.log("this is ", file);
  console.log("this is id", chatId);
  if (!file) {
    throw new ApiError(400, "Please upload at least one image");
  }
  const ModelImages = [];
  console.log("this is ", file);
  const cloudinaryResponse = await uploadonCloudinary(file.path);

  if (!cloudinaryResponse?.secure_url) {
    throw new ApiError(500, "Image upload failed");
  }

  ModelImages.push({
    fieldName: file.fieldName,
    url: cloudinaryResponse.secure_url,
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { images: ModelImages },
        "ModelImages uploaded successfully",
      ),
    );
});
export { UploadFashionImage, UploadModelImage };
