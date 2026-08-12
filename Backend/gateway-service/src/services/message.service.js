import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generatePoster } from "./ai.service.js";


const createMessageService = async ({
  clerkUserId,
  conversationId,
  messageData,
}) => {

  // 1. Find the MongoDB user using Clerk user ID
  const user = await User.findOne({
    clerkUserId,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }


  // 2. Find the conversation and verify ownership
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId: user._id,
  });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }


  // 3. Create the message
  const message = await Message.create({
    conversationId: conversation._id,
    ...messageData,
    status: "pending",
  });


  // 4. Update conversation metadata
  conversation.messageCount += 1;
  conversation.lastMessageAt = new Date();

  await conversation.save();


  // 5. Return created message
  return message;
};


const getMessagesService = async ({
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


  // 3. Fetch messages
  const messages = await Message.find({
    conversationId: conversation._id,
  }).sort({
    createdAt: 1,
  });


  return messages;
};


const processMessageService = async ({
  clerkUserId,
  conversationId,
  messageId,
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


  // 3. Find message inside this conversation
  const message = await Message.findOne({
    _id: messageId,
    conversationId: conversation._id,
  });

  if (!message) {
    throw new ApiError(404, "Message not found");
  }


  // 4. Prevent duplicate processing
  if (message.status === "completed") {
    throw new ApiError(
      400,
      "Message has already been processed"
    );
  }


  // 5. Mark message as processing
  message.status = "processing";

  await message.save();


  try {

    // 6. Send message data to AI service
    const aiResult = await generatePoster({
      modelImage: message.modelImage,
      productImage: message.productImage,
      category: message.category,
      platform: message.platform,
      includeText: message.includeText,
      gender: message.gender,
    });


    // 7. Save AI-generated result
    message.currentPosterImage =
      aiResult.currentPosterImage || "";

    message.mergeImage =
      aiResult.mergeImage || "";


    // 8. Mark message as completed
    message.status = "completed";

    await message.save();


    // 9. Return processed message
    return message;

  } catch (error) {

    // 10. Mark message as failed
    message.status = "failed";

    await message.save();

    throw error;
  }
};


export {
  createMessageService,
  getMessagesService,
  processMessageService,
};