import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import { ImageEditing } from "../models/image-editing.model.js";
import { ImageUsage } from "../models/ImageUsage.model.js";

const addConversation = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Find MongoDB user
  const user = await User.findOne({
    clerkUserId: userId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { ProjectName, ProjectId } = req.body;

  if (!ProjectName || !ProjectId) {
    throw new ApiError(400, "ProjectName and ProjectId are required");
  }

  let conversation = await Conversation.findOne({
    userId: user._id,
  });

  if (!conversation) {
    // First project → create conversation
    conversation = await Conversation.create({
      userId: user._id,

      messages: [
        {
          messageId: ProjectId,
          messageName: ProjectName,
        },
      ],

      lastMessageAt: new Date(),
    }); // 2. Create full Message document
    await Message.create({
      conversationId: conversation._id,

      MessageID: ProjectId,
      MessageName: ProjectName,

      // Fill this later when the project data is available
      Data: [],

      status: "pending",
    });

    await ImageEditing.create({
      MessageID: ProjectId,
      editedImages: [],
    });
    await ImageUsage.create({
      userId: user._id,
      downloadCount: 0,
      generatedCount: 0,
    });
  } else {
    // 1. Add lightweight message info to Conversation
    conversation.messages.push({
      messageId: ProjectId,
      messageName: ProjectName,
    });

    conversation.lastMessageAt = new Date();

    await conversation.save();

    // 2. Create full Message document
    await Message.create({
      conversationId: conversation._id,

      MessageID: ProjectId,
      MessageName: ProjectName,

      Data: [],

      status: "pending",
    });
    await ImageEditing.create({
      MessageID: ProjectId,
      editedImages: [],
    });
    await ImageUsage.create({
      userId: user._id,
      downloadCount: 0,
      generatedCount: 0,
    });
  }
  return res
    .status(201)
    .json(
      new ApiResponse(201, { conversation }, "Conversation added successfully"),
    );
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Find MongoDB user
  const user = await User.findOne({
    clerkUserId: userId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { ProjectId } = req.body;
  if (!ProjectId) {
    throw new ApiError(400, "ProjectName and ProjectId are required");
  }

  const conversation = await Conversation.findOne({
    userId: user._id,
  });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  const messageExists = conversation.messages.some(
    (message) => message.messageId === ProjectId,
  );

  if (!messageExists) {
    throw new ApiError(404, "Project not found in conversation");
  }

  conversation.messages.pull({
    messageId: ProjectId,
  });

  conversation.lastMessageAt = new Date();

  await conversation.save();
  const message = await Message.findOne({
    MessageID: ProjectId,
  });
  const editImage = await ImageEditing.findOne({
    MessageID: ProjectId,
  });
  const oldProductImage = message.Data?.[0]?.productImage;
  const oldModelImage = message.Data?.[0]?.modelImage;
  const oldcurrentPosterImage = message.Data?.[0]?.currentPosterImage;
  const oldpreviousImageUrl = editImage.editedImages?.[0]?.previousImageUrl;
  const oldNewImageUrl = editImage.editedImages?.[0]?.NewImageUrl;

  if (oldProductImage?.publicId) {
    try {
      await deleteFromCloudinary(oldProductImage.publicId);
    } catch (error) {
      console.error("Failed to delete old product image:", error);
    }
  }
  if (oldModelImage?.publicId) {
    try {
      await deleteFromCloudinary(oldModelImage.publicId);
    } catch (error) {
      console.error("Failed to delete old model image:", error);
    }
  }
  if (oldcurrentPosterImage?.publicId) {
    try {
      await deleteFromCloudinary(oldcurrentPosterImage.publicId);
    } catch (error) {
      console.error("Failed to delete old model image:", error);
    }
  }
  if (oldNewImageUrl?.publicId) {
    try {
      await deleteFromCloudinary(oldNewImageUrl.publicId);
    } catch (error) {
      console.error("Failed to delete old model image:", error);
    }
  }
  if (oldpreviousImageUrl?.publicId) {
    try {
      await deleteFromCloudinary(oldpreviousImageUrl.publicId);
    } catch (error) {
      console.error("Failed to delete old model image:", error);
    }
  }
  await ImageEditing.deleteOne({
    MessageID: ProjectId,
  });
  await Message.deleteOne({
    MessageID: ProjectId,
    conversationId: conversation._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, { conversation }, "Conversation added successfully"),
    );
});

const listMessage = asyncHandler(async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Find MongoDB user
  const user = await User.findOne({
    clerkUserId: userId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const conversation = await Conversation.findOne({
    userId: user._id,
  })
    .select("messages")
    .lean();

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: conversation.messages,
      },
      "Conversation messages fetched successfully",
    ),
  );
});

export { addConversation, deleteMessage, listMessage };
