import { getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { agentInstance } from "../services/axios.js";
import { downloadAndUploadToCloudinary } from "../utils/downloadAndUpload.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import { ImageEditing } from "../models/image-editing.model.js";

const createMessage = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const {
    ProjectId,
    modelImage,
    productImage,
    category,
    platform,
    includeText,
    Description,
    gender,
  } = req.body;

  if (!ProjectId) {
    throw new ApiError(400, "ProjectId is required");
  }

  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  if (!platform) {
    throw new ApiError(400, "Platform is required");
  }

  if (!Description) {
    throw new ApiError(400, "Description is required");
  }
  const updatedMessage = await Message.findOneAndUpdate(
    {
      MessageID: ProjectId,
    },
    {
      $set: {
        "Data.0.category": category,
        "Data.0.platform": platform,
        "Data.0.includeText": includeText,
        "Data.0.gender": gender,
        "Data.0.Description": Description,
      },
    },
    {
      new: true,
    },
  );
  const messageStore = await Message.findOne({
    MessageID: ProjectId,
  });
  const AgentData = {
    SelectedCatgory: category,
    FashionImage: messageStore.Data[0].productImage,
    ModelImage: messageStore.Data[0].modelImage,
    gender: gender,
    Description: Description,
    Textinclude: includeText,
    SelectedPlatform: platform,
  };
  const generatedImage = await agentInstance.post(
    "/Imgae/getImage/",
    AgentData,
  );
  const oldProductImage = messageStore.Data?.[0]?.currentPosterImage;

  const generatedImageUrl = await generatedImage.data.addAgent.PromptImage;
  const uploadImgae = await downloadAndUploadToCloudinary(generatedImageUrl);
  // 6. Delete the old Cloudinary image
  // console.log("this sis agent response", oldProductImage);

  const currentPosterImage = await Message.findOneAndUpdate(
    {
      MessageID: ProjectId,
    },
    {
      $set: {
        "Data.0.currentPosterImage": {
          url: uploadImgae.secureUrl,
          publicId: uploadImgae.publicId,
        },
      },
    },
    {
      new: true,
    },
  );
  if (oldProductImage?.publicId) {
    try {
      await deleteFromCloudinary(oldProductImage.publicId);
    } catch (error) {
      console.error("Failed to delete old product image:", error);
    }
  }
  const getNewMessage = await Message.findOne({
    MessageID: ProjectId,
  });
  const NewImage = getNewMessage.Data?.[0]?.currentPosterImage;
  return res
    .status(200)
    .json(new ApiResponse(200, "Message created successfully", { NewImage }));
});

const getMessages = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const { ProjectId } = req.body;

  const message = await Message.findOne({
    MessageID: ProjectId,
  });
  const ImageHistory = await ImageEditing.findOne({
    MessageID: ProjectId,
  });
  console.log("this is history", !ImageHistory);
  const chatData = message.Data;
  if (!message) {
    throw new ApiError(404, "Message not found");
  }
  if (!ImageHistory) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { chatData }, "Messages fetched successfully"),
      );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { chatData, ImageHistory: ImageHistory.editedImages[0] },
        "Messages fetched successfully",
      ),
    );
});

export { createMessage, getMessages };
