import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuth } from "@clerk/express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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
    });
  } else {
    // Existing conversation → add new project/message
    conversation.messages.push({
      messageId: ProjectId,
      messageName: ProjectName,
    });

    conversation.lastMessageAt = new Date();

    await conversation.save();
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

  let conversation = await Conversation.findOne({
    userId: user._id,
  });
  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  conversation.messages.pull({
    messageId: ProjectId,
  });

  conversation.lastMessageAt = new Date();

  await conversation.save();
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
