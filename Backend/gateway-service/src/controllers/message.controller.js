import { getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { createMessageService } from "../services/message.service.js";
import { getMessagesService } from "../services/message.service.js";


const createMessage = asyncHandler(async (req, res) => {

  // 1. Get authenticated Clerk user
  const { isAuthenticated, userId } = getAuth(req);

  // 2. Check authentication
  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // 3. Get conversation ID from URL
  const { conversationId } = req.params;

  // 4. Extract allowed request data
  const {
    title,
    modelImage,
    productImage,
    currentposterImage,
    category,
    platform,
    includeText,
    gender,
  } = req.body;

  // 5. Validate required fields
  if (!modelImage) {
    throw new ApiError(400, "Model image is required");
  }

  if (!productImage) {
    throw new ApiError(400, "Product image is required");
  }

  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  if (!platform) {
    throw new ApiError(400, "Platform is required");
  }

  // 6. Call service
  const message = await createMessageService({
    clerkUserId: userId,
    conversationId,
    messageData: {
      title,
      modelImage,
      productImage,
      currentposterImage,
      category,
      platform,
      includeText,
      gender,
    },
  });

  // 7. Send HTTP response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { message },
        "Message created successfully"
      )
    );
});

const getMessages = asyncHandler(async (req, res) => {

  // 1. Get authenticated Clerk user
  const { isAuthenticated, userId } = getAuth(req);

  // 2. Check authentication
  if (!isAuthenticated || !userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // 3. Get conversation ID
  const { conversationId } = req.params;

  // 4. Call service
  const messages = await getMessagesService({
    clerkUserId: userId,
    conversationId,
  });

  // 5. Send response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { messages },
        "Messages fetched successfully"
      )
    );
});

export { 
    createMessage,
    getMessages

};

