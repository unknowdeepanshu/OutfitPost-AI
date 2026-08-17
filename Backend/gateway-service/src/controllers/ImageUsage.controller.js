import { getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { agentInstance } from "../services/axios.js";
import { downloadAndUploadToCloudinary } from "../utils/downloadAndUpload.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import { ImageEditing } from "../models/image-editing.model.js";
import { User } from "../models/user.model.js";
import { ImageUsage } from "../models/ImageUsage.model.js";

const Download = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  } // Find MongoDB user
  const user = await User.findOne({
    clerkUserId: userId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await ImageUsage.findOneAndUpdate(
    { userId: user._id },
    {
      $inc: {
        downloadCount: 1,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  const downloadImgae = await ImageUsage.findOne({ userId: user._id });
  return res.status(200).json(
    new ApiResponse(200, "Download by this Image", {
      donwloadNumber: downloadImgae?.downloadCount,
    }),
  );
});

const Generated = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  } // Find MongoDB user
  const user = await User.findOne({
    clerkUserId: userId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await ImageUsage.findOneAndUpdate(
    { userId: user._id },
    {
      $inc: {
        generatedCount: 1,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  const downloadImgae = await ImageUsage.findOne({ userId: user._id });
  return res.status(200).json(
    new ApiResponse(200, "generatedCount by this Image", {
      generatedNumber: downloadImgae?.generatedCount,
    }),
  );
});
const GetDownloadAndGenerated = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  } // Find MongoDB user
  const user = await User.findOne({
    clerkUserId: userId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const downloadImgae = await ImageUsage.findOne({ userId: user._id });
  return res.status(200).json(
    new ApiResponse(200, "get Download and Generated ", {
      donwloadNumber: downloadImgae?.downloadCount,
      generatedNumber: downloadImgae?.generatedCount,
    }),
  );
});
export { Download, Generated, GetDownloadAndGenerated };
