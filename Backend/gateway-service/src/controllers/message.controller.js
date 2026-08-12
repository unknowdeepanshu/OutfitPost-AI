import { getAuth } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import {
    createMessageService,
    getMessagesService,
    processMessageService,
} from "../services/message.service.js";


const createMessage = asyncHandler(async (req, res) => {

    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const { conversationId } = req.params;

    const {
        title,
        modelImage,
        productImage,
        category,
        platform,
        includeText,
        gender,
    } = req.body;

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

    const message = await createMessageService({
        clerkUserId: userId,
        conversationId,
        messageData: {
            title,
            modelImage,
            productImage,
            category,
            platform,
            includeText,
            gender,
        },
    });

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

    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const { conversationId } = req.params;

    const messages = await getMessagesService({
        clerkUserId: userId,
        conversationId,
    });

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


const processMessage = asyncHandler(async (req, res) => {

    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const {
        conversationId,
        messageId,
    } = req.params;

    const message = await processMessageService({
        clerkUserId: userId,
        conversationId,
        messageId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { message },
                "Message processed successfully"
            )
        );
});


export {
    createMessage,
    getMessages,
    processMessage,
};