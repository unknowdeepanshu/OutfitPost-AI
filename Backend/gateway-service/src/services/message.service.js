import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";


createMessageService = async ({
  clerkUserId,
  conversationId,
  messageData,
}) => {

  // 1. Find MongoDB user
  const user = await User.findOne({
    clerkUserId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }


  // 2. Find conversation and verify ownership
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId: user._id,
  });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }


  // 3. Create message
  const message = await Message.create({
    conversationId: conversation._id,

    title: messageData.title,
    modelImage: messageData.modelImage,
    productImage: messageData.productImage,
    currentposterImage: messageData.currentposterImage,
    category: messageData.category,
    platform: messageData.platform,
    includeText: messageData.includeText,
    gender: messageData.gender,

    // Backend controls the status
    status: "pending",
  });


  // 4. Update conversation metadata
  conversation.messageCount += 1;
  conversation.lastMessageAt = new Date();

  await conversation.save();


  // 5. Return created message
  return message;
};

export const getMessagesService = async ({
  clerkUserId,
  conversationId,
}) => {

  // 1. Find MongoDB user
  const user = await User.findOne({
    clerkUserId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }


  // 2. Verify conversation ownership
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId: user._id,
  });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }


  // 3. Get messages
  const messages = await Message.find({
    conversationId: conversation._id,
  })
    .sort({ createdAt: 1 })
    .lean();


  // 4. Return messages
  return messages;
};

export { 
    createMessageService,
     getMessagesService
    }; 