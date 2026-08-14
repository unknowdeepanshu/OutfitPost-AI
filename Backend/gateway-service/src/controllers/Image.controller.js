import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  uploadonCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Message } from "../models/message.model.js";

const UploadFashionImage = asyncHandler(async (req, res) => {
  const auth = getAuth(req);

  if (!auth.isAuthenticated || !auth.userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const chatId = req.body.chatId;
  const file = req.file;

  if (!chatId) {
    throw new ApiError(400, "chatId is required");
  }

  if (!file) {
    throw new ApiError(400, "Please upload an image");
  }

  // 1. Find the existing message
  const message = await Message.findOne({
    MessageID: chatId,
  });

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  // 2. Get the old product/fashion image
  const oldProductImage = message.Data?.[0]?.productImage;

  // 3. Upload the new image
  const cloudinaryResponse = await uploadonCloudinary(file.path);

  if (!cloudinaryResponse?.secure_url) {
    throw new ApiError(500, "Image upload failed");
  }

  // 4. Create the new image object
  const newImage = {
    url: cloudinaryResponse.secure_url,
    publicId: cloudinaryResponse.public_id,
  };
  console.log(newImage);
  // 5. Update MongoDB
  await Message.findOneAndUpdate(
    {
      MessageID: chatId,
    },
    {
      $set: {
        "Data.0.productImage": {
          url: newImage.url,
          publicId: newImage.publicId,
        },
      },
    },
    {
      new: true,
    },
  );
  if (!message.Data?.length) {
    throw new ApiError(400, "Message data not initialized");
  }

  // 6. Delete the old Cloudinary image
  if (oldProductImage?.publicId) {
    try {
      await deleteFromCloudinary(oldProductImage.publicId);
    } catch (error) {
      console.error("Failed to delete old product image:", error);
    }
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        image: {
          fieldName: file.fieldname,
          url: newImage.url,
          publicId: newImage.publicId,
        },
      },
      "Fashion image uploaded successfully",
    ),
  );
});

const UploadModelImage = asyncHandler(async (req, res) => {
  const auth = getAuth(req);

  if (!auth.isAuthenticated || !auth.userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const chatId = req.body.chatId;
  const file = req.file;

  if (!chatId) {
    throw new ApiError(400, "chatId is required");
  }

  if (!file) {
    throw new ApiError(400, "Please upload an image");
  }

  // 1. Find the existing message
  const message = await Message.findOne({
    MessageID: chatId,
  });

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  // 2. Get the old model image
  const oldModelImage = message.Data?.[0]?.modelImage;

  // 3. Upload the new image
  const cloudinaryResponse = await uploadonCloudinary(file.path);

  if (!cloudinaryResponse?.secure_url) {
    throw new ApiError(500, "Image upload failed");
  }

  // 4. Create the new image object
  const newImage = {
    url: cloudinaryResponse.secure_url,
    publicId: cloudinaryResponse.public_id,
  };

  // 5. Update MongoDB
  await Message.findOneAndUpdate(
    {
      MessageID: chatId,
    },
    {
      $set: {
        "Data.0.modelImage": {
          url: newImage.url,
          publicId: newImage.publicId,
        },
      },
    },
    {
      new: true,
    },
  );
  if (!message.Data?.length) {
    throw new ApiError(400, "Message data not initialized");
  }

  // 6. Delete the old Cloudinary image
  if (oldModelImage?.publicId) {
    try {
      await deleteFromCloudinary(oldModelImage.publicId);
    } catch (error) {
      console.error("Failed to delete old model image:", error);
    }
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        image: {
          fieldName: file.fieldname,
          url: newImage.url,
          publicId: newImage.publicId,
        },
      },
      "Model image uploaded successfully",
    ),
  );
});

export { UploadFashionImage, UploadModelImage };
